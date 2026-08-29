from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.campaign import Campaign
from app.schemas.campaign import CampaignCreate
from app.services.dashboard_service import invalidate_dashboard_stats


def create_campaign(db: Session, request: CampaignCreate) -> Campaign:
    campaign = Campaign(**request.model_dump())
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    invalidate_dashboard_stats()

    return campaign


def list_campaigns(db: Session) -> list[Campaign]:
    return list(
        db.scalars(
            select(Campaign).order_by(Campaign.created_at.desc())
        ).all()
    )
