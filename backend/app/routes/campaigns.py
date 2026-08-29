from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.campaign import CampaignCreate, CampaignResponse
from app.services.campaign_service import create_campaign, list_campaigns

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
    _: User = Depends(get_current_user),
) -> CampaignResponse:
    return create_campaign(db, request)


@router.get("", response_model=list[CampaignResponse])
def list_all(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> list[CampaignResponse]:
    return list_campaigns(db)
