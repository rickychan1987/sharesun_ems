from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    position_id = Column(Integer, ForeignKey("positions.id"), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    phone = Column(String, nullable=True)

    position = relationship("Position")
    department = relationship("Department")
