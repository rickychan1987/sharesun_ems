from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from ..db.base import Base

class Employee(Base):
    __tablename__ = "employees"
    
    id = Column(Integer, primary_key=True, index=True)
    employeeid = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    positionid = Column(Integer, ForeignKey("positions.id"), nullable=False)  # Ensure this is NOT NULL
    department = Column(String, nullable=False)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    address = Column(String, nullable=True)
    city = Column(String, nullable=True)
    state = Column(String, nullable=True)
    postalcode = Column(String, nullable=True)
    country = Column(String, nullable=True)
    idcardtype = Column(String, nullable=True)
    idcardnumber = Column(String, nullable=True)
    dateofbirth = Column(Date, nullable=True)
    photo_url = Column(String, nullable=True)
    
    # Relationship with position
    position = relationship("Position", back_populates="employees")