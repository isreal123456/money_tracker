from collections import defaultdict
from itertools import count

from app.schemas import Category, Goal, Notification, Transaction, UserInternal

USERS: dict[int, UserInternal] = {}
USERS_BY_EMAIL: dict[str, int] = {}
TOKENS: dict[str, int] = {}
TRANSACTIONS: dict[int, list[Transaction]] = defaultdict(list)
CATEGORIES: dict[int, list[Category]] = defaultdict(list)
GOALS: dict[int, list[Goal]] = defaultdict(list)
NOTIFICATIONS: dict[int, list[Notification]] = defaultdict(list)
BUDGETS: dict[int, dict[str, object]] = {}

USER_ID_SEQ = count(1)
TRANSACTION_ID_SEQ = count(1)
CATEGORY_ID_SEQ = count(1)
GOAL_ID_SEQ = count(1)
NOTIFICATION_ID_SEQ = count(1)


def next_user_id() -> int:
    return next(USER_ID_SEQ)


def next_transaction_id() -> int:
    return next(TRANSACTION_ID_SEQ)


def next_category_id() -> int:
    return next(CATEGORY_ID_SEQ)


def next_goal_id() -> int:
    return next(GOAL_ID_SEQ)


def next_notification_id() -> int:
    return next(NOTIFICATION_ID_SEQ)


def reset_store() -> None:
    USERS.clear()
    USERS_BY_EMAIL.clear()
    TOKENS.clear()
    TRANSACTIONS.clear()
    CATEGORIES.clear()
    GOALS.clear()
    NOTIFICATIONS.clear()
    BUDGETS.clear()

    global USER_ID_SEQ, TRANSACTION_ID_SEQ, CATEGORY_ID_SEQ, GOAL_ID_SEQ, NOTIFICATION_ID_SEQ
    USER_ID_SEQ = count(1)
    TRANSACTION_ID_SEQ = count(1)
    CATEGORY_ID_SEQ = count(1)
    GOAL_ID_SEQ = count(1)
    NOTIFICATION_ID_SEQ = count(1)

