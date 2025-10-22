from sqlalchemy.orm import Session
from app.models.attendance import Attendance
from app.schemas.attendance import AttendanceCreate, AttendanceUpdate

def create_attendance(db: Session, att: AttendanceCreate):
    db_att = Attendance(**att.dict())
    db.add(db_att)
    db.commit()
    db.refresh(db_att)
    return db_att

def get_attendance(db: Session, skip=0, limit=100):
    return db.query(Attendance).offset(skip).limit(limit).all()

def get_attendance_by_id(db: Session, attendance_id: int):
    return db.query(Attendance).filter(Attendance.id == attendance_id).first()

def update_attendance(db: Session, attendance_id: int, att_update: AttendanceUpdate):
    db_att = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if db_att:
        for key, value in att_update.dict(exclude_unset=True).items():
            setattr(db_att, key, value)
        db.commit()
        db.refresh(db_att)
    return db_att

def delete_attendance(db: Session, attendance_id: int):
    db_att = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    if db_att:
        db.delete(db_att)
        db.commit()
    return db_att

def get_attendance_by_employee(db: Session, employee_id: int, skip=0, limit=100):
    return db.query(Attendance).filter(Attendance.employee_id == employee_id).offset(skip).limit(limit).all()
