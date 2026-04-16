from typing import Optional

from fastapi import APIRouter, Body, Depends, HTTPException, Path

from app.dependencies import get_current_user
from app.schemas import Notification, NotificationReadUpdate, UserInternal
from app.services import find_index_by_id
from app.store import NOTIFICATIONS

router = APIRouter(prefix="/api/notifications", tags=["notifications"])


@router.get("", response_model=list[Notification])
def list_notifications(current_user: UserInternal = Depends(get_current_user)):
    return sorted(NOTIFICATIONS[current_user.id], key=lambda n: n.createdAt, reverse=True)


@router.put("/{notification_id}/read", response_model=Notification)
def mark_notification_read(
    notification_id: int = Path(..., ge=1),
    payload: Optional[NotificationReadUpdate] = Body(default=None),
    current_user: UserInternal = Depends(get_current_user),
):
    items = NOTIFICATIONS[current_user.id]
    index = find_index_by_id(items, notification_id)
    if index == -1:
        raise HTTPException(status_code=404, detail="Notification not found")

    read_value = payload.read if payload else True
    updated = items[index].model_copy(update={"read": read_value})
    items[index] = updated
    return updated

