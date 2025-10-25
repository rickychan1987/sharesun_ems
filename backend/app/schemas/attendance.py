from pydantic import BaseModel
from datetime import datetime

class AttendanceBase(BaseModel):
    employee_id: int
    check_in: datetime
    check_out: datetime = None

class AttendanceCreate(AttendanceBase):
    pass

class Attendance(AttendanceBase):
    id: int

    class Config:
        orm_mode = True
