from pydantic import BaseModel
from datetime import datetime

class AttendanceBase(BaseModel):
    employee_name: str
    check_in: datetime
    check_out: datetime = None

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceUpdate(BaseModel):
    employee_name: str = None
    check_in: datetime = None
    check_out: datetime = None

class Attendance(AttendanceBase):
    id: int

    class Config:
        orm_mode = True
