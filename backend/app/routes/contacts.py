from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact_service import create_contact, list_contacts

router = APIRouter(
    prefix="/api/contacts",
    tags=["Contacts"],
)


@router.post(
    "",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
)
def create(
    request: ContactCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> ContactResponse:
    return create_contact(db, request)


@router.get("", response_model=list[ContactResponse])
def list_all(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> list[ContactResponse]:
    return list_contacts(db)
