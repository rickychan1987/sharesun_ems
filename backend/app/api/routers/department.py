from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.department import DepartmentCreate, Department
from app.crud.department import create_department, get_departments

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Department)
def add_department(department: DepartmentCreate, db: Session = Depends(get_db)):
    return create_department(db, department)

@router.get("/", response_model=list[Department])
def list_departments(db: Session = Depends(get_db)):
    return get_departments(db)
