from fastapi import APIRouter, Depends

from app.dependencies import get_current_user
from app.schemas import UserInternal
from app.services import build_budget_view
from app.store import TRANSACTIONS

router = APIRouter(prefix="/api/reports", tags=["reports"])


@router.get("/summary")
def report_summary(current_user: UserInternal = Depends(get_current_user)):
    items = TRANSACTIONS[current_user.id]
    total_income = sum(item.amount for item in items if item.type == "income")
    total_expenses = sum(item.amount for item in items if item.type == "expense")
    budget = build_budget_view(current_user.id, current_user.currency)

    category_totals: dict[str, float] = {}
    for item in items:
        if item.type == "expense":
            category_totals[item.category] = category_totals.get(item.category, 0.0) + item.amount

    top_categories = [
        {"category": category, "amount": amount}
        for category, amount in sorted(category_totals.items(), key=lambda pair: pair[1], reverse=True)[:5]
    ]

    recent = sorted(items, key=lambda txn: txn.date, reverse=True)[:5]

    budget_usage = 0.0
    if budget.monthlyLimit > 0:
        budget_usage = round((budget.spent / budget.monthlyLimit) * 100, 2)

    return {
        "totalIncome": total_income,
        "totalExpenses": total_expenses,
        "balance": total_income - total_expenses,
        "budgetUsage": budget_usage,
        "topCategories": top_categories,
        "recentTransactions": [item.model_dump() for item in recent],
    }


@router.get("/monthly")
def report_monthly(current_user: UserInternal = Depends(get_current_user)):
    grouped: dict[str, dict[str, float]] = {}
    for item in TRANSACTIONS[current_user.id]:
        month_key = item.date.strftime("%Y-%m")
        grouped.setdefault(month_key, {"income": 0.0, "expense": 0.0})
        grouped[month_key][item.type] += item.amount

    return [
        {"month": month, "income": values["income"], "expense": values["expense"]}
        for month, values in sorted(grouped.items())
    ]


@router.get("/category-breakdown")
def report_category_breakdown(current_user: UserInternal = Depends(get_current_user)):
    totals: dict[str, float] = {}
    for item in TRANSACTIONS[current_user.id]:
        if item.type == "expense":
            totals[item.category] = totals.get(item.category, 0.0) + item.amount

    return [{"category": category, "amount": amount} for category, amount in sorted(totals.items())]

