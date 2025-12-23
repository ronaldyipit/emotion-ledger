from pydantic import BaseModel
from datetime import datetime

class ExpenseCreate(BaseModel):
    amount: float
    emotion: str
    reason: str | None = None

class ExpenseOut(BaseModel):
    id: int
    amount: float
    emotion: str
    reason: str | None
    created_at: datetime

    class Config:
        from_attributes = True