from sqlalchemy.orm import Session
from app.models.announcement import Announcement
from app.schemas.announcement import AnnouncementCreate, AnnouncementUpdate

def create_announcement(db: Session, ann: AnnouncementCreate):
    db_ann = Announcement(**ann.dict())
    db.add(db_ann)
    db.commit()
    db.refresh(db_ann)
    return db_ann

def get_announcements(db: Session, skip=0, limit=100):
    return db.query(Announcement).order_by(Announcement.created_at.desc()).offset(skip).limit(limit).all()

def get_announcement_by_id(db: Session, announcement_id: int):
    return db.query(Announcement).filter(Announcement.id == announcement_id).first()

def update_announcement(db: Session, announcement_id: int, ann_update: AnnouncementUpdate):
    db_ann = db.query(Announcement).filter(Announcement.id == announcement_id).first()
    if db_ann:
        for key, value in ann_update.dict(exclude_unset=True).items():
            setattr(db_ann, key, value)
        db.commit()
        db.refresh(db_ann)
    return db_ann

def delete_announcement(db: Session, announcement_id: int):
    db_ann = db.query(Announcement).filter(Announcement.id == announcement_id).first()
    if db_ann:
        db.delete(db_ann)
        db.commit()
    return db_ann
