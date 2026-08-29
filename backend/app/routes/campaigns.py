from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.campaign import CampaignCreate, CampaignResponse, CampaignUpdate
from app.schemas.contact import ContactResponse
from app.services.campaign_service import (
    add_campaign_contact,
    create_campaign,
    delete_campaign,
    get_campaign,
    list_campaign_contacts,
    list_campaigns,
    remove_campaign_contact,
    update_campaign,
)

router = APIRouter(
    prefix="/api/campaigns",
    tags=["Campaigns"],
)


@router.post(
    "",
    response_model=CampaignResponse,
    status_code=status.HTTP_201_CREATED,
)
def create(
    request: CampaignCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CampaignResponse:
    try:
        return create_campaign(db, current_user, request)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error)) from error


@router.get("", response_model=list[CampaignResponse])
def list_all(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[CampaignResponse]:
    return list_campaigns(db, current_user)


@router.get("/{campaign_id}", response_model=CampaignResponse)
def read_one(
    campaign_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CampaignResponse:
    campaign = get_campaign(db, current_user, campaign_id)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found.")
    return campaign


@router.put("/{campaign_id}", response_model=CampaignResponse)
def update_one(
    campaign_id: int,
    request: CampaignUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CampaignResponse:
    campaign = update_campaign(db, current_user, campaign_id, request)
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found.")
    return campaign


@router.delete("/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_one(
    campaign_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Response:
    if not delete_campaign(db, current_user, campaign_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found.")
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/{campaign_id}/contacts", response_model=list[ContactResponse])
def read_contacts(
    campaign_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[ContactResponse]:
    contacts = list_campaign_contacts(db, current_user, campaign_id)
    if contacts is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found.")
    return contacts


@router.post("/{campaign_id}/contacts/{contact_id}", response_model=CampaignResponse)
def add_contact(
    campaign_id: int,
    contact_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CampaignResponse:
    try:
        campaign = add_campaign_contact(db, current_user, campaign_id, contact_id)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error)) from error
    if campaign is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign or contact not found.")
    return campaign


@router.delete("/{campaign_id}/contacts/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_contact(
    campaign_id: int,
    contact_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Response:
    try:
        removed = remove_campaign_contact(db, current_user, campaign_id, contact_id)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(error)) from error
    if not removed:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign contact not found.")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
