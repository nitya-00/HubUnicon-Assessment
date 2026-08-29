from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.billing import (
    PlanResponse,
    SubscriptionCreate,
    SubscriptionResponse,
)
from app.services.billing_service import (
    create_subscription,
    get_latest_subscription,
    list_plans,
)

router = APIRouter(prefix="/api/billing", tags=["Billing"])


@router.get("/plans", response_model=list[PlanResponse])
def read_plans(db: Session = Depends(get_db)) -> list[PlanResponse]:
    return list_plans(db)


@router.post(
    "/subscriptions",
    response_model=SubscriptionResponse,
    status_code=status.HTTP_201_CREATED,
)
def subscribe(
    request: SubscriptionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> SubscriptionResponse:
    try:
        return create_subscription(db, current_user, request)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        ) from error


@router.get("/subscriptions/me", response_model=SubscriptionResponse)
def read_my_subscription(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> SubscriptionResponse:
    subscription = get_latest_subscription(db, current_user)

    if subscription is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No subscription found.",
        )

    return subscription
