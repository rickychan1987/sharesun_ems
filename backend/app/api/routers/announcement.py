from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.announcement import AnnouncementCreate, AnnouncementUpdate, Announcement
from app.crud.announcement import (
    create_announcement,
    get_announcements,
    get_announcement_by_id,
    update_announcement,
    delete_announcement
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Announcement)
def add_announcement(ann: AnnouncementCreate, db: Session = Depends(get_db)):
    return create_announcement(db, ann)

@router.get("/", response_model=list[Announcement])
def list_announcements(db: Session = Depends(get_db)):
    return get_announcements(db)

@router.get("/{announcement_id}", response_model=Announcement)
def get_announcement(announcement_id: int, db: Session = Depends(get_db)):
    db_ann = get_announcement_by_id(db, announcement_id)
    if not db_ann:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return db_ann

@router.put("/{announcement_id}", response_model=Announcement)
def update_announcement_route(announcement_id: int, ann_update: AnnouncementUpdate, db: Session = Depends(get_db)):
    updated = update_announcement(db, announcement_id, ann_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return updated

@router.delete("/{announcement_id}", response_model=Announcement)
def delete_announcement_route(announcement_id: int, db: Session = Depends(get_db)):
    deleted = delete_announcement(db, announcement_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return deleted
