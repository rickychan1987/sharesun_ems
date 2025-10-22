from pydantic import BaseModel
from datetime import date

class LeaveBase(BaseModel):
    employee_id: int
    start_date: date
    end_date: date
    reason: str = None
    status: str = "pending"  # allowed: pending, approved, rejected

class LeaveCreate(LeaveBase):
    pass

class LeaveUpdate(BaseModel):
    start_date: date = None
    end_date: date = None
    reason: str = None
    status: str = None

class Leave(LeaveBase):
    id: int

    class Config:
        orm_mode = True
