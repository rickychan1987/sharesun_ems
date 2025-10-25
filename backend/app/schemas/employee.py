from pydantic import BaseModel, EmailStr, validator, field_validator
from typing import Optional
from datetime import date

class EmployeeBase(BaseModel):
    employeeid: str
    name: str
    positionid: int  # Remove Optional, make it required
    department: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    postalcode: Optional[str] = None
    country: Optional[str] = None
    idcardtype: Optional[str] = None
    idcardnumber: Optional[str] = None
    dateofbirth: Optional[date] = None
    photo_url: Optional[str] = None

    @field_validator('positionid', mode='before')
    @classmethod
    def validate_positionid(cls, v):
        # Ensure positionid is never None and convert to int if needed
        if v is None:
            raise ValueError('positionid cannot be None')
        return int(v)

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    positionid: Optional[int] = None
    department: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    postalcode: Optional[str] = None
    country: Optional[str] = None
    idcardtype: Optional[str] = None
    idcardnumber: Optional[str] = None
    dateofbirth: Optional[date] = None
    photo_url: Optional[str] = None

    @field_validator('positionid', mode='before')
    @classmethod
    def validate_positionid(cls, v):
        if v is not None:
            return int(v)
        return v

class Employee(EmployeeBase):
    id: int
    
    class Config:
        from_attributes = True