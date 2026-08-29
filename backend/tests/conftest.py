import os

os.environ.setdefault("JWT_SECRET", "test-secret-at-least-32-characters-long")

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.main import app

# Import every model before creating test tables.
from app.models.campaign import Campaign  # noqa: F401
from app.models.campaign_contact import CampaignContact  # noqa: F401
from app.models.contact import Contact  # noqa: F401
from app.models.payment import Payment  # noqa: F401
from app.models.plan import Plan  # noqa: F401
from app.models.subscription import Subscription  # noqa: F401
from app.models.user import User  # noqa: F401


@pytest.fixture()
def client():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    testing_session = sessionmaker(bind=engine, autocommit=False, autoflush=False)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db = testing_session()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)
