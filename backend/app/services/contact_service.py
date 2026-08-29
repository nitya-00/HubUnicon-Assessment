from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from app.models.campaign import Campaign
from app.models.campaign_contact import CampaignContact
from app.models.contact import Contact
from app.models.user import User
from app.schemas.contact import ContactCreate, ContactUpdate
from app.services.dashboard_service import invalidate_dashboard_stats


def _contact_for_user(db: Session, user: User, contact_id: int) -> Contact | None:
    return db.scalar(
        select(Contact).where(Contact.id == contact_id, Contact.user_id == user.id)
    )


def _ensure_unique_email(
    db: Session,
    user: User,
    email: str | None,
    excluding_contact_id: int | None = None,
) -> None:
    if email is None:
        return
    statement = select(Contact).where(
        Contact.user_id == user.id,
        Contact.email == email,
    )
    if excluding_contact_id is not None:
        statement = statement.where(Contact.id != excluding_contact_id)
    if db.scalar(statement) is not None:
        raise ValueError("A contact with this email already exists in your workspace.")


def create_contact(db: Session, user: User, request: ContactCreate) -> Contact:
    values = request.model_dump()
    _ensure_unique_email(db, user, values["email"])
    contact = Contact(user_id=user.id, **values)
    db.add(contact)
    db.commit()
    db.refresh(contact)
    invalidate_dashboard_stats(user.id)

    return contact


def get_contact(db: Session, user: User, contact_id: int) -> Contact | None:
    return _contact_for_user(db, user, contact_id)


def list_contacts(db: Session, user: User) -> list[Contact]:
    return list(
        db.scalars(
            select(Contact)
            .where(Contact.user_id == user.id)
            .order_by(Contact.created_at.desc())
        ).all()
    )


def update_contact(
    db: Session,
    user: User,
    contact_id: int,
    request: ContactUpdate,
) -> Contact | None:
    contact = _contact_for_user(db, user, contact_id)
    if contact is None:
        return None
    values = request.model_dump()
    _ensure_unique_email(db, user, values["email"], contact.id)
    for field, value in values.items():
        setattr(contact, field, value)
    db.commit()
    db.refresh(contact)
    invalidate_dashboard_stats(user.id)
    return contact


def delete_contact(db: Session, user: User, contact_id: int) -> bool:
    contact = _contact_for_user(db, user, contact_id)
    if contact is None:
        return False
    affected_campaigns = list(
        db.scalars(
            select(Campaign)
            .join(CampaignContact, CampaignContact.campaign_id == Campaign.id)
            .where(
                CampaignContact.contact_id == contact.id,
                Campaign.user_id == user.id,
            )
        ).all()
    )
    db.execute(delete(CampaignContact).where(CampaignContact.contact_id == contact.id))
    for campaign in affected_campaigns:
        campaign.audience_size = db.scalar(
            select(func.count())
            .select_from(CampaignContact)
            .where(CampaignContact.campaign_id == campaign.id)
        ) or 0
    db.delete(contact)
    db.commit()
    invalidate_dashboard_stats(user.id)
    return True
