from fastapi import APIRouter, Depends, HTTPException, Path, Response

from app.dependencies import get_current_user
from app.schemas import Goal, GoalCreate, GoalUpdate, UserInternal
from app.services import find_index_by_id
from app.store import GOALS, next_goal_id

router = APIRouter(prefix="/api/goals", tags=["goals"])


@router.get("", response_model=list[Goal])
def list_goals(current_user: UserInternal = Depends(get_current_user)):
    return GOALS[current_user.id]


@router.post("", response_model=Goal, status_code=201)
def create_goal(payload: GoalCreate, current_user: UserInternal = Depends(get_current_user)):
    item = Goal(id=next_goal_id(), **payload.model_dump())
    GOALS[current_user.id].append(item)
    return item


@router.put("/{goal_id}", response_model=Goal)
def update_goal(
    payload: GoalUpdate,
    goal_id: int = Path(..., ge=1),
    current_user: UserInternal = Depends(get_current_user),
):
    items = GOALS[current_user.id]
    index = find_index_by_id(items, goal_id)
    if index == -1:
        raise HTTPException(status_code=404, detail="Goal not found")

    updated = items[index].model_copy(update=payload.model_dump(exclude_none=True))
    items[index] = updated
    return updated


@router.delete("/{goal_id}", status_code=204)
def delete_goal(goal_id: int, current_user: UserInternal = Depends(get_current_user)):
    items = GOALS[current_user.id]
    index = find_index_by_id(items, goal_id)
    if index == -1:
        raise HTTPException(status_code=404, detail="Goal not found")

    items.pop(index)
    return Response(status_code=204)

