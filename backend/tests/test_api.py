from fastapi.testclient import TestClient

from main import app, reset_store


client = TestClient(app)


def setup_function() -> None:
    reset_store()


def signup_and_auth_header() -> dict[str, str]:
    response = client.post(
        "/api/auth/signup",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "password": "secret123",
            "currency": "USD",
        },
    )
    assert response.status_code == 200
    token = response.json()["token"]
    return {"Authorization": f"Bearer {token}"}


def test_auth_endpoints() -> None:
    headers = signup_and_auth_header()

    me = client.get("/api/auth/me", headers=headers)
    assert me.status_code == 200
    assert me.json()["email"] == "test@example.com"

    login = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "secret123"},
    )
    assert login.status_code == 200
    assert "token" in login.json()


def test_transactions_budget_and_reports() -> None:
    headers = signup_and_auth_header()

    create_a = client.post(
        "/api/transactions",
        headers=headers,
        json={
            "amount": 5000,
            "type": "income",
            "category": "Salary",
            "date": "2026-04-01",
            "note": "Monthly salary",
        },
    )
    assert create_a.status_code == 201

    create_b = client.post(
        "/api/transactions",
        headers=headers,
        json={
            "amount": 1200,
            "type": "expense",
            "category": "Rent",
            "date": "2026-04-02",
        },
    )
    assert create_b.status_code == 201

    tx_id = create_b.json()["id"]
    updated = client.put(
        f"/api/transactions/{tx_id}",
        headers=headers,
        json={"note": "Updated note"},
    )
    assert updated.status_code == 200
    assert updated.json()["note"] == "Updated note"

    budget = client.put("/api/budget", headers=headers, json={"monthlyLimit": 3000})
    assert budget.status_code == 200
    assert budget.json()["spent"] == 1200

    summary = client.get("/api/reports/summary", headers=headers)
    assert summary.status_code == 200
    data = summary.json()
    assert data["totalIncome"] == 5000
    assert data["totalExpenses"] == 1200
    assert data["balance"] == 3800

    monthly = client.get("/api/reports/monthly", headers=headers)
    assert monthly.status_code == 200
    assert len(monthly.json()) == 1

    breakdown = client.get("/api/reports/category-breakdown", headers=headers)
    assert breakdown.status_code == 200
    assert breakdown.json()[0]["category"] == "Rent"


def test_categories_goals_notifications_and_settings() -> None:
    headers = signup_and_auth_header()

    category = client.post(
        "/api/categories",
        headers=headers,
        json={"name": "Food", "type": "expense", "color": "#ff0000", "icon": "utensils"},
    )
    assert category.status_code == 201
    category_id = category.json()["id"]

    update_category = client.put(
        f"/api/categories/{category_id}",
        headers=headers,
        json={"name": "Groceries"},
    )
    assert update_category.status_code == 200
    assert update_category.json()["name"] == "Groceries"

    goal = client.post(
        "/api/goals",
        headers=headers,
        json={"title": "Vacation", "targetAmount": 2000, "savedAmount": 300},
    )
    assert goal.status_code == 201
    goal_id = goal.json()["id"]

    update_goal = client.put(f"/api/goals/{goal_id}", headers=headers, json={"savedAmount": 500})
    assert update_goal.status_code == 200
    assert update_goal.json()["savedAmount"] == 500

    notifications = client.get("/api/notifications", headers=headers)
    assert notifications.status_code == 200
    first_notification_id = notifications.json()[0]["id"]

    mark_read = client.put(
        f"/api/notifications/{first_notification_id}/read",
        headers=headers,
        json={"read": True},
    )
    assert mark_read.status_code == 200
    assert mark_read.json()["read"] is True

    settings = client.put(
        "/api/settings",
        headers=headers,
        json={
            "name": "New Name",
            "currency": "EUR",
            "theme": "dark",
            "language": "en",
            "budgetAlertThreshold": 80,
        },
    )
    assert settings.status_code == 200
    settings_json = settings.json()
    assert settings_json["name"] == "New Name"
    assert settings_json["currency"] == "EUR"
    assert settings_json["theme"] == "dark"
    assert settings_json["language"] == "en"

