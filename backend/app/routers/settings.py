from fastapi import APIRouter, Depends

from app.dependencies import get_current_user
from app.schemas import Settings, SettingsUpdate, UserInternal
from app.services import get_or_create_budget

router = APIRouter(prefix="/api/settings", tags=["settings"])


@router.get("", response_model=Settings)
def get_settings(current_user: UserInternal = Depends(get_current_user)):
    return Settings(
        name=current_user.name,
        email=current_user.email,
        currency=current_user.currency,
        theme=current_user.theme,
        language=current_user.language,
        budgetAlertThreshold=current_user.budget_alert_threshold,
    )


@router.put("", response_model=Settings)
def update_settings(payload: SettingsUpdate, current_user: UserInternal = Depends(get_current_user)):
    updates = payload.model_dump(exclude_none=True)

    if "name" in updates:
        current_user.name = updates["name"]
    if "currency" in updates:
        current_user.currency = updates["currency"]
        get_or_create_budget(current_user.id, current_user.currency)["currency"] = updates["currency"]
    if "theme" in updates:
        current_user.theme = updates["theme"]
    if "language" in updates:
        current_user.language = updates["language"]
    if "budgetAlertThreshold" in updates:
        current_user.budget_alert_threshold = updates["budgetAlertThreshold"]

    return get_settings(current_user)

