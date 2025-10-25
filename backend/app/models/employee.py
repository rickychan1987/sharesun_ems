from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    position_id = Column(Integer, ForeignKey("positions.id"))
    # add more fields

    position = relationship("Position", back_populates="employees")
