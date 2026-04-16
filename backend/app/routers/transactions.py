from fastapi import APIRouter, Depends, HTTPException, Path, Response

from app.dependencies import get_current_user
from app.schemas import Transaction, TransactionCreate, TransactionUpdate, UserInternal
from app.services import find_index_by_id
from app.store import TRANSACTIONS, next_transaction_id

router = APIRouter(prefix="/api/transactions", tags=["transactions"])


@router.get("", response_model=list[Transaction])
def list_transactions(current_user: UserInternal = Depends(get_current_user)):
    return TRANSACTIONS[current_user.id]


@router.post("", response_model=Transaction, status_code=201)
def create_transaction(payload: TransactionCreate, current_user: UserInternal = Depends(get_current_user)):
    item = Transaction(id=next_transaction_id(), **payload.model_dump())
    TRANSACTIONS[current_user.id].append(item)
    return item


@router.put("/{transaction_id}", response_model=Transaction)
def update_transaction(
    payload: TransactionUpdate,
    transaction_id: int = Path(..., ge=1),
    current_user: UserInternal = Depends(get_current_user),
):
    items = TRANSACTIONS[current_user.id]
    index = find_index_by_id(items, transaction_id)
    if index == -1:
        raise HTTPException(status_code=404, detail="Transaction not found")

    updated = items[index].model_copy(update=payload.model_dump(exclude_none=True))
    items[index] = updated
    return updated


@router.delete("/{transaction_id}", status_code=204)
def delete_transaction(transaction_id: int, current_user: UserInternal = Depends(get_current_user)):
    items = TRANSACTIONS[current_user.id]
    index = find_index_by_id(items, transaction_id)
    if index == -1:
        raise HTTPException(status_code=404, detail="Transaction not found")

    items.pop(index)
    return Response(status_code=204)

