from sqlalchemy.orm import Session
from app.models.payroll import Payroll
from app.schemas.payroll import PayrollCreate, PayrollUpdate

def create_payroll(db: Session, payroll: PayrollCreate):
    db_payroll = Payroll(**payroll.dict())
    db.add(db_payroll)
    db.commit()
    db.refresh(db_payroll)
    return db_payroll

def get_payrolls(db: Session, skip=0, limit=100):
    return db.query(Payroll).offset(skip).limit(limit).all()

def get_payroll_by_id(db: Session, payroll_id: int):
    return db.query(Payroll).filter(Payroll.id == payroll_id).first()

def update_payroll(db: Session, payroll_id: int, payroll_update: PayrollUpdate):
    db_payroll = db.query(Payroll).filter(Payroll.id == payroll_id).first()
    if db_payroll:
        for key, value in payroll_update.dict(exclude_unset=True).items():
            setattr(db_payroll, key, value)
        db.commit()
        db.refresh(db_payroll)
    return db_payroll

def delete_payroll(db: Session, payroll_id: int):
    db_payroll = db.query(Payroll).filter(Payroll.id == payroll_id).first()
    if db_payroll:
        db.delete(db_payroll)
        db.commit()
    return db_payroll

def get_payrolls_by_employee(db: Session, employee_id: int, skip=0, limit=100):
    return db.query(Payroll).filter(Payroll.employee_id == employee_id).offset(skip).limit(limit).all()
