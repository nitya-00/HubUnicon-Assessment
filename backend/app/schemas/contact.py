from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    first_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=50)
    company: str | None = Field(default=None, max_length=255)


class ContactUpdate(ContactCreate):
    pass


class ContactResponse(ContactCreate):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }


class ContactImportResult(BaseModel):
    imported: int
    skipped_duplicates: int
    invalid_rows: int
    errors: list[str]
