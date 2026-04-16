from fastapi import APIRouter, Depends

from app.dependencies import get_current_user
from app.schemas import BudgetUpdate, BudgetView, UserInternal
from app.services import build_budget_view, get_or_create_budget

router = APIRouter(prefix="/api/budget", tags=["budget"])


@router.get("", response_model=BudgetView)
def get_budget(current_user: UserInternal = Depends(get_current_user)):
    return build_budget_view(current_user.id, current_user.currency)


@router.put("", response_model=BudgetView)
def update_budget(payload: BudgetUpdate, current_user: UserInternal = Depends(get_current_user)):
    budget = get_or_create_budget(current_user.id, current_user.currency)
    budget["monthlyLimit"] = payload.monthlyLimit
    if payload.currency:
        budget["currency"] = payload.currency
        current_user.currency = payload.currency
    return build_budget_view(current_user.id, current_user.currency)

