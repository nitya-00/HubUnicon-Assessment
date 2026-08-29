from pydantic import BaseModel


class DashboardStats(BaseModel):
    user_count: int
    contact_count: int
    campaign_count: int
    cache_status: str
