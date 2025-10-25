from pydantic import BaseModel
from datetime import date

class PayrollBase(BaseModel):
    employee_name: str
    base_salary: float
    bonus: float = 0.0
    deductions: float = 0.0
    net_pay: float
    pay_date: date

class PayrollCreate(PayrollBase):
    pass

class PayrollUpdate(BaseModel):
    employee_name: str = None
    base_salary: float = None
    bonus: float = None
    deductions: float = None
    net_pay: float = None
    pay_date: date = None

class Payroll(PayrollBase):
    id: int

    class Config:
        orm_mode = True
