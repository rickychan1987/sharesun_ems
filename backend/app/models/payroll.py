from sqlalchemy import Column, Integer, Float, Date, String
from app.db.base import Base

class Payroll(Base):
    __tablename__ = "payrolls"

    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String, nullable=False)
    base_salary = Column(Float, nullable=False)
    bonus = Column(Float, default=0.0)
    deductions = Column(Float, default=0.0)
    net_pay = Column(Float, nullable=False)
    pay_date = Column(Date, nullable=False)
