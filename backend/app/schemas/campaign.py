from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class CampaignCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    status: Literal["draft", "scheduled", "sent"] = "draft"
    audience_size: int = Field(default=0, ge=0)
    contact_ids: list[int] = Field(default_factory=list)


class CampaignUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    status: Literal["draft", "scheduled", "sent"] | None = None
    audience_size: int | None = Field(default=None, ge=0)


class CampaignResponse(BaseModel):
    id: int
    name: str
    status: Literal["draft", "scheduled", "sent"]
    audience_size: int
    messages_sent: int
    converted_contacts: int
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }
