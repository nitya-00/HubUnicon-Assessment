import os
import unittest

os.environ.setdefault("JWT_SECRET", "test-secret-at-least-32-characters-long")

import jwt

from app.core.config import JWT_ALGORITHM, JWT_SECRET
from app.core.security import create_access_token, hash_password, verify_password


class SecurityTests(unittest.TestCase):
    def test_password_hashing(self):
        hashed_password = hash_password("secure-password")

        self.assertTrue(verify_password("secure-password", hashed_password))
        self.assertFalse(verify_password("incorrect-password", hashed_password))

    def test_access_token(self):
        token = create_access_token("42")
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])

        self.assertEqual(payload["sub"], "42")
        self.assertIn("exp", payload)
