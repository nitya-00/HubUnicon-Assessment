from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.campaign import Campaign
from app.models.campaign_contact import CampaignContact
from app.models.user import User
from app.schemas.report import CampaignReport, CampaignReportItem


def campaign_report(db: Session, user: User) -> CampaignReport:
    rows = db.execute(
        select(Campaign, func.count(CampaignContact.contact_id).label("contact_count"))
        .outerjoin(CampaignContact, CampaignContact.campaign_id == Campaign.id)
        .where(Campaign.user_id == user.id)
        .group_by(Campaign.id)
        .order_by(Campaign.created_at.desc())
    ).all()
    return CampaignReport(
        campaigns=[
            CampaignReportItem(
                campaign_id=campaign.id,
                campaign_name=campaign.name,
                status=campaign.status,
                contact_count=contact_count,
                messages_sent=campaign.messages_sent,
                converted_contacts=campaign.converted_contacts,
                conversion_rate=(
                    round((campaign.converted_contacts / campaign.messages_sent) * 100, 2)
                    if campaign.messages_sent
                    else 0.0
                ),
                created_at=campaign.created_at,
            )
            for campaign, contact_count in rows
        ]
    )
