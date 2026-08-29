from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, Field


class PlanResponse(BaseModel):
    id: int
    name: str
    price: Decimal
    description: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class SubscriptionCreate(BaseModel):
    plan_id: int = Field(gt=0)


class SubscriptionResponse(BaseModel):
    id: int
    user_id: int
    plan_id: int
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class PaymentResponse(BaseModel):
    id: int
    subscription_id: int
    amount: Decimal
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
