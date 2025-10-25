from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.employee import EmployeeCreate, Employee
from app.crud.employee import create_employee

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Employee)
def add_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return create_employee(db, employee)
