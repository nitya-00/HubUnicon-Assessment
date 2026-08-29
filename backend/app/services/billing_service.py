from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.payment import Payment
from app.models.plan import Plan
from app.models.subscription import Subscription
from app.models.user import User
from app.schemas.billing import SubscriptionCreate
from app.services.notification_service import notify_subscription_created


def list_plans(db: Session) -> list[Plan]:
    return list(db.scalars(select(Plan).order_by(Plan.price)).all())


def create_subscription(
    db: Session,
    user: User,
    request: SubscriptionCreate,
) -> Subscription:
    plan = db.get(Plan, request.plan_id)

    if plan is None:
        raise ValueError("Plan not found.")

    subscription = Subscription(user_id=user.id, plan_id=plan.id)
    db.add(subscription)
    db.flush()
    db.add(
        Payment(
            subscription_id=subscription.id,
            amount=plan.price,
        )
    )
    db.commit()
    db.refresh(subscription)
    notify_subscription_created(user.email, plan.name)

    return subscription


def get_latest_subscription(db: Session, user: User) -> Subscription | None:
    return db.scalar(
        select(Subscription)
        .where(Subscription.user_id == user.id)
        .order_by(Subscription.created_at.desc())
    )
