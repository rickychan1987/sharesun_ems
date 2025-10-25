from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Attendance(Base):
    __tablename__ = "attendances"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), index=True, nullable=False)
    check_in = Column(DateTime, nullable=False)
    check_out = Column(DateTime, nullable=True)

    employee = relationship("Employee")
