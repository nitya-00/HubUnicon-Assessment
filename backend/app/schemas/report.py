from datetime import datetime

from pydantic import BaseModel


class CampaignReportItem(BaseModel):
    campaign_id: int
    campaign_name: str
    status: str
    contact_count: int
    messages_sent: int
    converted_contacts: int
    conversion_rate: float
    created_at: datetime


class CampaignReport(BaseModel):
    campaigns: list[CampaignReportItem]
