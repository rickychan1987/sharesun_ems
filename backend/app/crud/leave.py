from sqlalchemy.orm import Session
from app.models.leave import Leave
from app.schemas.leave import LeaveCreate, LeaveUpdate

def create_leave(db: Session, leave: LeaveCreate):
    db_leave = Leave(**leave.dict())
    db.add(db_leave)
    db.commit()
    db.refresh(db_leave)
    return db_leave

def get_leaves(db: Session, skip=0, limit=100):
    return db.query(Leave).offset(skip).limit(limit).all()

def get_leave_by_id(db: Session, leave_id: int):
    return db.query(Leave).filter(Leave.id == leave_id).first()

def update_leave(db: Session, leave_id: int, leave_update: LeaveUpdate):
    db_leave = db.query(Leave).filter(Leave.id == leave_id).first()
    if db_leave:
        for key, value in leave_update.dict(exclude_unset=True).items():
            setattr(db_leave, key, value)
        db.commit()
        db.refresh(db_leave)
    return db_leave

def delete_leave(db: Session, leave_id: int):
    db_leave = db.query(Leave).filter(Leave.id == leave_id).first()
    if db_leave:
        db.delete(db_leave)
        db.commit()
    return db_leave

def get_leaves_by_employee(db: Session, employee_id: int, skip=0, limit=100):
    return db.query(Leave).filter(Leave.employee_id == employee_id).offset(skip).limit(limit).all()
