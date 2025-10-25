from pydantic import BaseModel
from datetime import datetime

class AnnouncementBase(BaseModel):
    title: str
    message: str
    department: str = None

class AnnouncementCreate(AnnouncementBase):
    pass

class AnnouncementUpdate(BaseModel):
    title: str = None
    message: str = None
    department: str = None

class Announcement(AnnouncementBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
