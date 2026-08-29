from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.cache import delete_cached_value, get_cached_json, set_cached_json
from app.models.campaign import Campaign
from app.models.contact import Contact
from app.models.user import User
from app.schemas.dashboard import DashboardStats

DASHBOARD_CACHE_KEY = "dashboard:stats"


def get_dashboard_stats(db: Session) -> DashboardStats:
    cached_stats = get_cached_json(DASHBOARD_CACHE_KEY)

    if cached_stats is not None:
        return DashboardStats(**cached_stats, cache_status="hit")

    stats = DashboardStats(
        user_count=db.scalar(select(func.count()).select_from(User)) or 0,
        contact_count=db.scalar(select(func.count()).select_from(Contact)) or 0,
        campaign_count=db.scalar(select(func.count()).select_from(Campaign)) or 0,
        cache_status="miss",
    )
    set_cached_json(
        DASHBOARD_CACHE_KEY,
        stats.model_dump(exclude={"cache_status"}),
    )

    return stats


def invalidate_dashboard_stats() -> None:
    delete_cached_value(DASHBOARD_CACHE_KEY)
