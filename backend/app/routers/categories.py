from fastapi import APIRouter, Depends, HTTPException, Path, Response

from app.dependencies import get_current_user
from app.schemas import Category, CategoryCreate, CategoryUpdate, UserInternal
from app.services import find_index_by_id
from app.store import CATEGORIES, next_category_id

router = APIRouter(prefix="/api/categories", tags=["categories"])


@router.get("", response_model=list[Category])
def list_categories(current_user: UserInternal = Depends(get_current_user)):
    return CATEGORIES[current_user.id]


@router.post("", response_model=Category, status_code=201)
def create_category(payload: CategoryCreate, current_user: UserInternal = Depends(get_current_user)):
    item = Category(id=next_category_id(), **payload.model_dump())
    CATEGORIES[current_user.id].append(item)
    return item


@router.put("/{category_id}", response_model=Category)
def update_category(
    payload: CategoryUpdate,
    category_id: int = Path(..., ge=1),
    current_user: UserInternal = Depends(get_current_user),
):
    items = CATEGORIES[current_user.id]
    index = find_index_by_id(items, category_id)
    if index == -1:
        raise HTTPException(status_code=404, detail="Category not found")

    updated = items[index].model_copy(update=payload.model_dump(exclude_none=True))
    items[index] = updated
    return updated


@router.delete("/{category_id}", status_code=204)
def delete_category(category_id: int, current_user: UserInternal = Depends(get_current_user)):
    items = CATEGORIES[current_user.id]
    index = find_index_by_id(items, category_id)
    if index == -1:
        raise HTTPException(status_code=404, detail="Category not found")

    items.pop(index)
    return Response(status_code=204)

