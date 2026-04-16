from datetime import datetime, timezone
from hashlib import sha256
from typing import Literal
from uuid import uuid4

from app.schemas import BudgetView, Notification, UserInternal, UserProfile
from app.store import BUDGETS, NOTIFICATIONS, TOKENS, TRANSACTIONS, next_notification_id


def hash_password(password: str) -> str:
    # memoryview satisfies buffer protocol checks in stricter type analyzers.
    return sha256(memoryview(password.encode("utf-8"))).hexdigest()


def to_profile(user: UserInternal) -> UserProfile:
    return UserProfile(
        id=user.id,
        name=user.name,
        email=user.email,
        currency=user.currency,
        theme=user.theme,
    )


def create_token(user_id: int) -> str:
    token = f"token-{uuid4().hex}"
    TOKENS[token] = user_id
    return token


def add_notification(
    user_id: int,
    title: str,
    message: str,
    notification_type: Literal["warning", "info", "success"],
) -> None:
    NOTIFICATIONS[user_id].append(
        Notification(
            id=next_notification_id(),
            title=title,
            message=message,
            type=notification_type,
            read=False,
            createdAt=datetime.now(timezone.utc),
        )
    )


def get_or_create_budget(user_id: int, user_currency: str) -> dict[str, object]:
    if user_id not in BUDGETS:
        BUDGETS[user_id] = {
            "monthlyLimit": 0.0,
            "currency": user_currency,
            "period": "monthly",
        }
    return BUDGETS[user_id]


def build_budget_view(user_id: int, user_currency: str) -> BudgetView:
    budget = get_or_create_budget(user_id, user_currency)
    spent = sum(item.amount for item in TRANSACTIONS[user_id] if item.type == "expense")
    raw_limit = budget.get("monthlyLimit", 0.0)
    monthly_limit = float(raw_limit) if isinstance(raw_limit, (int, float, str)) else 0.0
    return BudgetView(
        monthlyLimit=monthly_limit,
        currency=str(budget["currency"]),
        period=str(budget.get("period") or "monthly"),
        spent=spent,
        remaining=monthly_limit - spent,
    )


def find_index_by_id(items: list[object], item_id: int) -> int:
    for idx, item in enumerate(items):
        if getattr(item, "id", None) == item_id:
            return idx
    return -1

