from pydantic import BaseModel


class DashboardStats(BaseModel):
    user_count: int
    contact_count: int
    campaign_count: int
    active_campaign_count: int
    messages_sent: int
    conversion_rate: float
    cache_status: str
