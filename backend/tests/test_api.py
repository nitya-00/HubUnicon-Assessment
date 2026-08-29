from app.services.dashboard_service import dashboard_cache_key


def register_and_login(client, email: str, full_name: str = "Test User") -> dict[str, str]:
    register_response = client.post(
        "/api/auth/register",
        json={"full_name": full_name, "email": email, "password": "secure-password"},
    )
    assert register_response.status_code == 201
    login_response = client.post(
        "/api/auth/login",
        json={"email": email, "password": "secure-password"},
    )
    assert login_response.status_code == 200
    return {"Authorization": f"Bearer {login_response.json()['access_token']}"}


def create_contact(client, headers, email: str = "contact@example.com") -> dict:
    response = client.post(
        "/api/contacts",
        headers=headers,
        json={"first_name": "Ada", "last_name": "Lovelace", "email": email, "company": "Analytical"},
    )
    assert response.status_code == 201
    return response.json()


def test_auth_validation_duplicate_and_invalid_login(client):
    invalid = client.post("/api/auth/register", json={"full_name": "", "email": "bad", "password": "short"})
    assert invalid.status_code == 422
    headers = register_and_login(client, "member@example.com")
    duplicate = client.post(
        "/api/auth/register",
        json={"full_name": "Another", "email": "member@example.com", "password": "secure-password"},
    )
    assert duplicate.status_code == 409
    invalid_login = client.post(
        "/api/auth/login",
        json={"email": "member@example.com", "password": "wrong-password"},
    )
    assert invalid_login.status_code == 401
    assert client.get("/api/auth/me", headers=headers).status_code == 200


def test_contact_crud_is_scoped_to_authenticated_user(client):
    owner = register_and_login(client, "owner@example.com", "Owner")
    other = register_and_login(client, "other@example.com", "Other")
    contact = create_contact(client, owner)
    contact_id = contact["id"]

    assert client.get(f"/api/contacts/{contact_id}", headers=other).status_code == 404
    assert client.put(
        f"/api/contacts/{contact_id}",
        headers=other,
        json={"first_name": "Stolen", "last_name": "", "email": "contact@example.com", "phone": "", "company": ""},
    ).status_code == 404
    assert client.delete(f"/api/contacts/{contact_id}", headers=other).status_code == 404

    updated = client.put(
        f"/api/contacts/{contact_id}",
        headers=owner,
        json={"first_name": "Grace", "last_name": "Hopper", "email": "contact@example.com", "phone": "123", "company": "Navy"},
    )
    assert updated.status_code == 200
    assert updated.json()["first_name"] == "Grace"
    assert client.delete(f"/api/contacts/{contact_id}", headers=owner).status_code == 204


def test_campaign_associations_and_dashboard_are_user_scoped(client):
    owner = register_and_login(client, "campaign-owner@example.com", "Campaign Owner")
    other = register_and_login(client, "campaign-other@example.com", "Campaign Other")
    owner_contact = create_contact(client, owner, "owner-contact@example.com")
    other_contact = create_contact(client, other, "other-contact@example.com")

    campaign_response = client.post(
        "/api/campaigns",
        headers=owner,
        json={"name": "Owner campaign", "contact_ids": [owner_contact["id"]]},
    )
    assert campaign_response.status_code == 201
    campaign_id = campaign_response.json()["id"]
    assert campaign_response.json()["audience_size"] == 1

    assert client.get(f"/api/campaigns/{campaign_id}", headers=other).status_code == 404
    assert client.put(
        f"/api/campaigns/{campaign_id}", headers=other, json={"name": "Hijacked"}
    ).status_code == 404
    assert client.delete(f"/api/campaigns/{campaign_id}", headers=other).status_code == 404
    assert client.post(
        f"/api/campaigns/{campaign_id}/contacts/{other_contact['id']}", headers=owner
    ).status_code == 404

    contacts = client.get(f"/api/campaigns/{campaign_id}/contacts", headers=owner)
    assert contacts.status_code == 200
    assert [item["id"] for item in contacts.json()] == [owner_contact["id"]]
    owner_stats = client.get("/api/dashboard/stats", headers=owner).json()
    other_stats = client.get("/api/dashboard/stats", headers=other).json()
    assert owner_stats["contact_count"] == 1
    assert owner_stats["campaign_count"] == 1
    assert other_stats["contact_count"] == 1
    assert other_stats["campaign_count"] == 0
    assert dashboard_cache_key(1) != dashboard_cache_key(2)


def test_csv_import_validates_rows_duplicates_and_ownership(client):
    owner = register_and_login(client, "csv-owner@example.com", "CSV Owner")
    other = register_and_login(client, "csv-other@example.com", "CSV Other")
    csv_data = (
        "first_name,last_name,email,phone,company\n"
        "Ada,Lovelace,ada@example.com,111,Analytical\n"
        "Duplicate,User,ada@example.com,222,Analytical\n"
        "Bad,Email,not-an-email,333,Invalid\n"
    )
    imported = client.post(
        "/api/contacts/upload",
        headers=owner,
        files={"file": ("contacts.csv", csv_data, "text/csv")},
    )
    assert imported.status_code == 201
    assert imported.json()["imported"] == 1
    assert imported.json()["skipped_duplicates"] == 1
    assert imported.json()["invalid_rows"] == 1
    assert len(client.get("/api/contacts", headers=owner).json()) == 1
    assert client.get("/api/contacts", headers=other).json() == []
    malformed = client.post(
        "/api/contacts/upload",
        headers=owner,
        files={"file": ("contacts.csv", "email\nuser@example.com\n", "text/csv")},
    )
    assert malformed.status_code == 400


def test_campaign_report_is_scoped_to_current_user(client):
    owner = register_and_login(client, "report-owner@example.com", "Report Owner")
    other = register_and_login(client, "report-other@example.com", "Report Other")
    owner_contact = create_contact(client, owner, "report-contact@example.com")
    owner_campaign = client.post(
        "/api/campaigns",
        headers=owner,
        json={"name": "Owner report", "status": "scheduled", "contact_ids": [owner_contact["id"]]},
    )
    assert owner_campaign.status_code == 201
    assert client.post(
        "/api/campaigns", headers=other, json={"name": "Other report"}
    ).status_code == 201
    report = client.get("/api/reports/campaigns", headers=owner)
    assert report.status_code == 200
    assert [item["campaign_name"] for item in report.json()["campaigns"]] == ["Owner report"]


def test_deleting_contact_refreshes_campaign_audience_size(client):
    headers = register_and_login(client, "audience@example.com", "Audience Owner")
    contact = create_contact(client, headers, "audience-contact@example.com")
    campaign = client.post(
        "/api/campaigns",
        headers=headers,
        json={"name": "Audience campaign", "contact_ids": [contact["id"]]},
    ).json()
    assert client.delete(f"/api/contacts/{contact['id']}", headers=headers).status_code == 204
    refreshed = client.get(f"/api/campaigns/{campaign['id']}", headers=headers)
    assert refreshed.status_code == 200
    assert refreshed.json()["audience_size"] == 0
