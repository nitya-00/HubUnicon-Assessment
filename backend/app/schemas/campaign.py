from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class CampaignCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    status: Literal["draft", "scheduled", "sent"] = "draft"
    audience_size: int = Field(default=0, ge=0)


class CampaignResponse(CampaignCreate):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }
