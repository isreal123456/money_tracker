from datetime import date, datetime
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field


class UserProfile(BaseModel):
    id: int
    name: str
    email: EmailStr
    currency: str = "USD"
    theme: str = "dark"


class UserInternal(UserProfile):
    password_hash: str
    language: Optional[str] = None
    budget_alert_threshold: Optional[float] = None


class AuthResponse(BaseModel):
    token: str
    user: UserProfile


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=6)
    currency: Optional[str] = "USD"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TransactionBase(BaseModel):
    amount: float
    type: Literal["income", "expense"]
    category: str
    date: date
    note: Optional[str] = None


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    amount: Optional[float] = None
    type: Optional[Literal["income", "expense"]] = None
    category: Optional[str] = None
    date: Optional[date] = None
    note: Optional[str] = None


class Transaction(TransactionBase):
    id: int


class CategoryBase(BaseModel):
    name: str
    type: Literal["income", "expense"]
    color: Optional[str] = None
    icon: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[Literal["income", "expense"]] = None
    color: Optional[str] = None
    icon: Optional[str] = None


class Category(CategoryBase):
    id: int


class BudgetUpdate(BaseModel):
    monthlyLimit: float = Field(gt=0)
    currency: Optional[str] = None


class BudgetView(BaseModel):
    monthlyLimit: float
    currency: str
    period: Optional[str] = "monthly"
    spent: float
    remaining: float


class GoalBase(BaseModel):
    title: str
    targetAmount: float = Field(gt=0)
    savedAmount: Optional[float] = 0
    deadline: Optional[date] = None
    status: Optional[str] = None


class GoalCreate(GoalBase):
    pass


class GoalUpdate(BaseModel):
    title: Optional[str] = None
    targetAmount: Optional[float] = Field(default=None, gt=0)
    savedAmount: Optional[float] = None
    deadline: Optional[date] = None
    status: Optional[str] = None


class Goal(GoalBase):
    id: int


class Notification(BaseModel):
    id: int
    title: str
    message: str
    type: Literal["warning", "info", "success"]
    read: bool = False
    createdAt: datetime


class NotificationReadUpdate(BaseModel):
    read: bool = True


class Settings(BaseModel):
    name: str
    email: EmailStr
    currency: str
    theme: str
    language: Optional[str] = None
    budgetAlertThreshold: Optional[float] = None


class SettingsUpdate(BaseModel):
    name: Optional[str] = None
    currency: Optional[str] = None
    theme: Optional[str] = None
    language: Optional[str] = None
    budgetAlertThreshold: Optional[float] = None

