from sqlalchemy import Column, Integer, String, DateTime
from app.db.base import Base
from datetime import datetime

class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    department = Column(String, nullable=True)  # Changed to string
