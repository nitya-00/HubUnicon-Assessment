from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.contact import Contact
from app.schemas.contact import ContactCreate
from app.services.dashboard_service import invalidate_dashboard_stats


def create_contact(db: Session, request: ContactCreate) -> Contact:
    contact = Contact(**request.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    invalidate_dashboard_stats()

    return contact


def list_contacts(db: Session) -> list[Contact]:
    return list(
        db.scalars(
            select(Contact).order_by(Contact.created_at.desc())
        ).all()
    )
