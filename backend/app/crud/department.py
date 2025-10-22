from sqlalchemy.orm import Session
from app.models.department import Department
from app.schemas.department import DepartmentCreate, DepartmentUpdate

def create_department(db: Session, dep: DepartmentCreate):
    db_dep = Department(**dep.dict())
    db.add(db_dep)
    db.commit()
    db.refresh(db_dep)
    return db_dep

def get_departments(db: Session, skip=0, limit=100):
    return db.query(Department).offset(skip).limit(limit).all()

def get_department_by_id(db: Session, department_id: int):
    return db.query(Department).filter(Department.id == department_id).first()

def update_department(db: Session, department_id: int, department_update: DepartmentUpdate):
    db_dep = db.query(Department).filter(Department.id == department_id).first()
    if db_dep:
        for key, value in department_update.dict(exclude_unset=True).items():
            setattr(db_dep, key, value)
        db.commit()
        db.refresh(db_dep)
    return db_dep

def delete_department(db: Session, department_id: int):
    db_dep = db.query(Department).filter(Department.id == department_id).first()
    if db_dep:
        db.delete(db_dep)
        db.commit()
    return db_dep
