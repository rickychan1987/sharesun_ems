from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.attendance import AttendanceCreate, AttendanceUpdate, Attendance
from app.crud.attendance import (
    create_attendance,
    get_attendance,
    get_attendance_by_id,
    update_attendance,
    delete_attendance,
    get_attendance_by_employee
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Attendance)
def add_attendance(att: AttendanceCreate, db: Session = Depends(get_db)):
    return create_attendance(db, att)

@router.get("/", response_model=list[Attendance])
def list_attendance(db: Session = Depends(get_db)):
    return get_attendance(db)

@router.get("/{attendance_id}", response_model=Attendance)
def get_attendance_record(attendance_id: int, db: Session = Depends(get_db)):
    db_att = get_attendance_by_id(db, attendance_id)
    if not db_att:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return db_att

@router.put("/{attendance_id}", response_model=Attendance)
def update_attendance_route(attendance_id: int, att_update: AttendanceUpdate, db: Session = Depends(get_db)):
    updated = update_attendance(db, attendance_id, att_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return updated

@router.delete("/{attendance_id}", response_model=Attendance)
def delete_attendance_route(attendance_id: int, db: Session = Depends(get_db)):
    deleted = delete_attendance(db, attendance_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    return deleted

@router.get("/employee/{employee_id}", response_model=list[Attendance])
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    return get_attendance_by_employee(db, employee_id)
