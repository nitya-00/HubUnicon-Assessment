from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.report import CampaignReport
from app.services.report_service import campaign_report

router = APIRouter(prefix="/api/reports", tags=["Reports"])


@router.get("/campaigns", response_model=CampaignReport)
def read_campaign_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CampaignReport:
    return campaign_report(db, current_user)
