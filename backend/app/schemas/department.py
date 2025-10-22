from pydantic import BaseModel

class DepartmentBase(BaseModel):
    name: str
    description: str = None

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentUpdate(BaseModel):
    name: str = None
    description: str = None

class Department(DepartmentBase):
    id: int

    class Config:
        orm_mode = True
