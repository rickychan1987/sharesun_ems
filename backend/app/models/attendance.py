from sqlalchemy import Column, Integer, DateTime, String
from app.db.base import Base

class Attendance(Base):
    __tablename__ = "attendances"

    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String, nullable=False)  # Store employee name instead
    check_in = Column(DateTime, nullable=False)
    check_out = Column(DateTime, nullable=True)
