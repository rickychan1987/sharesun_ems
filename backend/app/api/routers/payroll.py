from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.payroll import PayrollCreate, PayrollUpdate, Payroll
from app.crud.payroll import (
    create_payroll,
    get_payrolls,
    get_payroll_by_id,
    update_payroll,
    delete_payroll,
    get_payrolls_by_employee
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Payroll)
def add_payroll(payroll: PayrollCreate, db: Session = Depends(get_db)):
    return create_payroll(db, payroll)

@router.get("/", response_model=list[Payroll])
def list_payrolls(db: Session = Depends(get_db)):
    return get_payrolls(db)

@router.get("/{payroll_id}", response_model=Payroll)
def get_payroll(payroll_id: int, db: Session = Depends(get_db)):
    db_payroll = get_payroll_by_id(db, payroll_id)
    if not db_payroll:
        raise HTTPException(status_code=404, detail="Payroll record not found")
    return db_payroll

@router.put("/{payroll_id}", response_model=Payroll)
def update_payroll_route(payroll_id: int, payroll_update: PayrollUpdate, db: Session = Depends(get_db)):
    updated = update_payroll(db, payroll_id, payroll_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Payroll record not found")
    return updated

@router.delete("/{payroll_id}", response_model=Payroll)
def delete_payroll_route(payroll_id: int, db: Session = Depends(get_db)):
    deleted = delete_payroll(db, payroll_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Payroll record not found")
    return deleted

@router.get("/employee/{employee_id}", response_model=list[Payroll])
def get_employee_payrolls(employee_id: int, db: Session = Depends(get_db)):
    return get_payrolls_by_employee(db, employee_id)
