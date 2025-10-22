from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.leave import LeaveCreate, LeaveUpdate, Leave
from app.crud.leave import (
    create_leave,
    get_leaves,
    get_leave_by_id,
    update_leave,
    delete_leave,
    get_leaves_by_employee
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Leave)
def add_leave(leave: LeaveCreate, db: Session = Depends(get_db)):
    return create_leave(db, leave)

@router.get("/", response_model=list[Leave])
def list_leaves(db: Session = Depends(get_db)):
    return get_leaves(db)

@router.get("/{leave_id}", response_model=Leave)
def get_leave(leave_id: int, db: Session = Depends(get_db)):
    db_leave = get_leave_by_id(db, leave_id)
    if not db_leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    return db_leave

@router.put("/{leave_id}", response_model=Leave)
def update_leave_route(leave_id: int, leave_update: LeaveUpdate, db: Session = Depends(get_db)):
    updated = update_leave(db, leave_id, leave_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Leave not found")
    return updated

@router.delete("/{leave_id}", response_model=Leave)
def delete_leave_route(leave_id: int, db: Session = Depends(get_db)):
    deleted = delete_leave(db, leave_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Leave not found")
    return deleted

@router.get("/employee/{employee_id}", response_model=list[Leave])
def get_employee_leaves(employee_id: int, db: Session = Depends(get_db)):
    return get_leaves_by_employee(db, employee_id)
