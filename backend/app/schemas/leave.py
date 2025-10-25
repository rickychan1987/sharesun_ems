from pydantic import BaseModel
from datetime import date

class LeaveBase(BaseModel):
    employee_name: str
    start_date: date
    end_date: date
    reason: str = None
    status: str = "pending"

class LeaveCreate(LeaveBase):
    pass

class LeaveUpdate(BaseModel):
    employee_name: str = None
    start_date: date = None
    end_date: date = None
    reason: str = None
    status: str = None

class Leave(LeaveBase):
    id: int

    class Config:
        orm_mode = True
