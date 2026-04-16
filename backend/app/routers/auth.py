from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_current_user
from app.schemas import AuthResponse, LoginRequest, SignupRequest, UserInternal, UserProfile
from app.services import add_notification, create_token, hash_password, to_profile
from app.store import USERS, USERS_BY_EMAIL, next_user_id

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup", response_model=AuthResponse)
def signup(payload: SignupRequest):
    email_key = str(payload.email).lower()
    if email_key in USERS_BY_EMAIL:
        raise HTTPException(status_code=400, detail="Email already exists")

    user_id = next_user_id()
    user = UserInternal(
        id=user_id,
        name=payload.name,
        email=payload.email,
        currency=payload.currency or "USD",
        theme="dark",
        password_hash=hash_password(payload.password),
    )

    USERS[user_id] = user
    USERS_BY_EMAIL[email_key] = user_id
    add_notification(user_id, "Welcome", "Your account has been created.", "success")

    token = create_token(user_id)
    return AuthResponse(token=token, user=to_profile(user))


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest):
    user_id = USERS_BY_EMAIL.get(str(payload.email).lower())
    user = USERS.get(user_id) if user_id else None
    if not user or user.password_hash != hash_password(payload.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token(user.id)
    return AuthResponse(token=token, user=to_profile(user))


@router.get("/me", response_model=UserProfile)
def me(current_user: UserInternal = Depends(get_current_user)):
    return to_profile(current_user)
