from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from app.models.campaign import Campaign
from app.models.campaign_contact import CampaignContact
from app.models.contact import Contact
from app.models.user import User
from app.schemas.campaign import CampaignCreate, CampaignUpdate
from app.services.dashboard_service import invalidate_dashboard_stats


def _campaign_for_user(db: Session, user: User, campaign_id: int) -> Campaign | None:
    return db.scalar(
        select(Campaign).where(Campaign.id == campaign_id, Campaign.user_id == user.id)
    )


def _owned_contact_ids(db: Session, user: User, contact_ids: list[int]) -> set[int]:
    unique_ids = set(contact_ids)
    if not unique_ids:
        return set()
    owned_ids = set(
        db.scalars(
            select(Contact.id).where(
                Contact.id.in_(unique_ids),
                Contact.user_id == user.id,
            )
        ).all()
    )
    if owned_ids != unique_ids:
        raise ValueError("One or more contacts were not found.")
    return owned_ids


def _sync_audience_size(db: Session, campaign: Campaign) -> None:
    campaign.audience_size = db.scalar(
        select(func.count())
        .select_from(CampaignContact)
        .where(CampaignContact.campaign_id == campaign.id)
    ) or 0


def create_campaign(db: Session, user: User, request: CampaignCreate) -> Campaign:
    values = request.model_dump(exclude={"contact_ids"})
    contact_ids = _owned_contact_ids(db, user, request.contact_ids)
    campaign = Campaign(user_id=user.id, **values)
    db.add(campaign)
    db.flush()
    for contact_id in contact_ids:
        db.add(CampaignContact(campaign_id=campaign.id, contact_id=contact_id))
    if contact_ids:
        campaign.audience_size = len(contact_ids)
    db.commit()
    db.refresh(campaign)
    invalidate_dashboard_stats(user.id)

    return campaign


def get_campaign(db: Session, user: User, campaign_id: int) -> Campaign | None:
    return _campaign_for_user(db, user, campaign_id)


def list_campaigns(db: Session, user: User) -> list[Campaign]:
    return list(
        db.scalars(
            select(Campaign)
            .where(Campaign.user_id == user.id)
            .order_by(Campaign.created_at.desc())
        ).all()
    )


def update_campaign(
    db: Session,
    user: User,
    campaign_id: int,
    request: CampaignUpdate,
) -> Campaign | None:
    campaign = _campaign_for_user(db, user, campaign_id)
    if campaign is None:
        return None
    for field, value in request.model_dump(exclude_unset=True).items():
        setattr(campaign, field, value)
    db.commit()
    db.refresh(campaign)
    invalidate_dashboard_stats(user.id)
    return campaign


def delete_campaign(db: Session, user: User, campaign_id: int) -> bool:
    campaign = _campaign_for_user(db, user, campaign_id)
    if campaign is None:
        return False
    db.execute(delete(CampaignContact).where(CampaignContact.campaign_id == campaign.id))
    db.delete(campaign)
    db.commit()
    invalidate_dashboard_stats(user.id)
    return True


def list_campaign_contacts(
    db: Session,
    user: User,
    campaign_id: int,
) -> list[Contact] | None:
    campaign = _campaign_for_user(db, user, campaign_id)
    if campaign is None:
        return None
    return list(
        db.scalars(
            select(Contact)
            .join(CampaignContact, CampaignContact.contact_id == Contact.id)
            .where(
                CampaignContact.campaign_id == campaign.id,
                Contact.user_id == user.id,
            )
            .order_by(Contact.created_at.desc())
        ).all()
    )


def add_campaign_contact(
    db: Session,
    user: User,
    campaign_id: int,
    contact_id: int,
) -> Campaign | None:
    campaign = _campaign_for_user(db, user, campaign_id)
    if campaign is None:
        return None
    _owned_contact_ids(db, user, [contact_id])
    if db.get(CampaignContact, (campaign.id, contact_id)) is None:
        db.add(CampaignContact(campaign_id=campaign.id, contact_id=contact_id))
        db.flush()
        _sync_audience_size(db, campaign)
        db.commit()
        db.refresh(campaign)
        invalidate_dashboard_stats(user.id)
    return campaign


def remove_campaign_contact(
    db: Session,
    user: User,
    campaign_id: int,
    contact_id: int,
) -> bool:
    campaign = _campaign_for_user(db, user, campaign_id)
    if campaign is None:
        return False
    _owned_contact_ids(db, user, [contact_id])
    association = db.get(CampaignContact, (campaign.id, contact_id))
    if association is None:
        return False
    db.delete(association)
    db.flush()
    _sync_audience_size(db, campaign)
    db.commit()
    invalidate_dashboard_stats(user.id)
    return True
