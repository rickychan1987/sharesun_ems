from pydantic import BaseModel

class EmployeeBase(BaseModel):
    name: str
    position_id: int

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int

    class Config:
        orm_mode = True
