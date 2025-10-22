from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
from datetime import datetime
from pydantic import BaseModel
from datetime import datetime

class AnnouncementBase(BaseModel):
    title: str
    message: str
    department_id: int = None

class AnnouncementCreate(AnnouncementBase):
    pass

class AnnouncementUpdate(BaseModel):
    title: str = None
    message: str = None
    department_id: int = None

class Announcement(AnnouncementBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
