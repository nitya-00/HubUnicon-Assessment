from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.cache import delete_cached_value, get_cached_json, set_cached_json
from app.models.campaign import Campaign
from app.models.contact import Contact
from app.models.user import User
from app.schemas.dashboard import DashboardStats

DASHBOARD_CACHE_KEY_PREFIX = "dashboard:stats:user"


def dashboard_cache_key(user_id: int) -> str:
    return f"{DASHBOARD_CACHE_KEY_PREFIX}:{user_id}"


def get_dashboard_stats(db: Session, user: User) -> DashboardStats:
    cache_key = dashboard_cache_key(user.id)
    cached_stats = get_cached_json(cache_key)

    if cached_stats is not None:
        return DashboardStats(**cached_stats, cache_status="hit")

    stats = DashboardStats(
        user_count=1,
        contact_count=db.scalar(
            select(func.count()).select_from(Contact).where(Contact.user_id == user.id)
        ) or 0,
        campaign_count=db.scalar(
            select(func.count()).select_from(Campaign).where(Campaign.user_id == user.id)
        ) or 0,
        active_campaign_count=db.scalar(
            select(func.count())
            .select_from(Campaign)
            .where(Campaign.user_id == user.id, Campaign.status != "draft")
        ) or 0,
        messages_sent=db.scalar(
            select(func.coalesce(func.sum(Campaign.messages_sent), 0)).where(
                Campaign.user_id == user.id
            )
        ) or 0,
        conversion_rate=0.0,
        cache_status="miss",
    )
    if stats.messages_sent:
        converted_contacts = db.scalar(
            select(func.coalesce(func.sum(Campaign.converted_contacts), 0)).where(
                Campaign.user_id == user.id
            )
        ) or 0
        stats.conversion_rate = round((converted_contacts / stats.messages_sent) * 100, 2)
    set_cached_json(
        cache_key,
        stats.model_dump(exclude={"cache_status"}),
    )

    return stats


def invalidate_dashboard_stats(user_id: int) -> None:
    delete_cached_value(dashboard_cache_key(user_id))
