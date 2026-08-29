import os
import unittest

os.environ.setdefault("JWT_SECRET", "test-secret-at-least-32-characters-long")

from fastapi.testclient import TestClient

from app.main import app


class AppTests(unittest.TestCase):
    client = TestClient(app)

    def test_root(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()["message"],
            "HubFlow Automation API is running",
        )

    def test_health(self):
        response = self.client.get("/api/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "healthy")
