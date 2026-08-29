import csv
from io import TextIOWrapper

from fastapi import UploadFile
from pydantic import ValidationError
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.contact import Contact
from app.models.user import User
from app.schemas.contact import ContactCreate, ContactImportResult
from app.services.dashboard_service import invalidate_dashboard_stats

REQUIRED_HEADERS = {"first_name", "last_name", "email", "phone", "company"}
MAX_IMPORT_ROWS = 5_000
MAX_REPORTED_ERRORS = 50


def import_contacts_csv(
    db: Session,
    user: User,
    upload: UploadFile,
) -> ContactImportResult:
    wrapper = TextIOWrapper(upload.file, encoding="utf-8-sig", newline="")
    reader = csv.DictReader(wrapper)
    headers = set(reader.fieldnames or [])
    if not REQUIRED_HEADERS.issubset(headers):
        missing = ", ".join(sorted(REQUIRED_HEADERS - headers))
        raise ValueError(f"CSV is missing required headers: {missing}.")

    known_emails = set(
        db.scalars(
            select(Contact.email).where(
                Contact.user_id == user.id,
                Contact.email.is_not(None),
            )
        ).all()
    )
    imported = 0
    skipped_duplicates = 0
    invalid_rows = 0
    errors: list[str] = []

    for row_number, row in enumerate(reader, start=2):
        if row_number > MAX_IMPORT_ROWS + 1:
            raise ValueError(f"CSV exceeds the {MAX_IMPORT_ROWS}-row import limit.")
        if None in row:
            invalid_rows += 1
            if len(errors) < MAX_REPORTED_ERRORS:
                errors.append(f"Row {row_number}: too many columns.")
            continue

        payload = {header: (row.get(header) or "").strip() or None for header in REQUIRED_HEADERS}
        if payload["email"] is None:
            invalid_rows += 1
            if len(errors) < MAX_REPORTED_ERRORS:
                errors.append(f"Row {row_number}: email is required.")
            continue
        try:
            contact_data = ContactCreate.model_validate(payload)
        except ValidationError:
            invalid_rows += 1
            if len(errors) < MAX_REPORTED_ERRORS:
                errors.append(f"Row {row_number}: invalid contact data.")
            continue

        email = str(contact_data.email)
        if email in known_emails:
            skipped_duplicates += 1
            continue
        known_emails.add(email)
        db.add(Contact(user_id=user.id, **contact_data.model_dump()))
        imported += 1

    db.commit()
    if imported:
        invalidate_dashboard_stats(user.id)
    return ContactImportResult(
        imported=imported,
        skipped_duplicates=skipped_duplicates,
        invalid_rows=invalid_rows,
        errors=errors,
    )
