import logging

logger = logging.getLogger(__name__)


def notify_subscription_created(email: str, plan_name: str) -> None:
    """Integration seam for email/SMS providers used in production."""
    logger.info("Subscription created for %s on plan %s", email, plan_name)
