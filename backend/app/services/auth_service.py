from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest
from app.services.dashboard_service import invalidate_dashboard_stats


def register_user(db: Session, request: RegisterRequest) -> User:
    existing_user = db.scalar(
        select(User).where(User.email == request.email)
    )

    if existing_user is not None:
        raise ValueError("A user with this email already exists.")

    user = User(
        full_name=request.full_name,
        email=str(request.email),
        hashed_password=hash_password(request.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    invalidate_dashboard_stats(user.id)

    return user


def login_user(db: Session, request: LoginRequest) -> str:
    user = db.scalar(
        select(User).where(User.email == request.email)
    )

    if user is None or not verify_password(
        request.password,
        user.hashed_password,
    ):
        raise ValueError("Invalid email or password.")

    return create_access_token(subject=str(user.id))
