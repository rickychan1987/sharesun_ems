from sqlalchemy.orm import Session
from app.models.department import Department
from app.schemas.department import DepartmentCreate

def create_department(db: Session, department: DepartmentCreate):
    db_department = Department(**department.dict())
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department

def get_departments(db: Session, skip=0, limit=100):
    return db.query(Department).offset(skip).limit(limit).all()
