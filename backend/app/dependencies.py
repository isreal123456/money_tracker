from fastapi import Header, HTTPException, status

from app.schemas import UserInternal
from app.store import TOKENS, USERS


def get_current_user(authorization: str = Header(default="")) -> UserInternal:
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token")

    token = authorization.replace("Bearer ", "", 1).strip()
    user_id = TOKENS.get(token)
    user = USERS.get(user_id) if user_id else None
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return user

