from pydantic import BaseModel

class EmployeeBase(BaseModel):
    name: str
    position_id: int
    department_id: int
    email: str = None
    phone: str = None

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    name: str = None
    position_id: int = None
    department_id: int = None
    email: str = None
    phone: str = None

class Employee(EmployeeBase):
    id: int

    class Config:
        orm_mode = True
