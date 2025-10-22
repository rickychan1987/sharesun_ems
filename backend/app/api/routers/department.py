from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.department import DepartmentCreate, DepartmentUpdate, Department
from app.crud.department import (
    create_department,
    get_departments,
    get_department_by_id,
    update_department,
    delete_department
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Department)
def add_department(dep: DepartmentCreate, db: Session = Depends(get_db)):
    return create_department(db, dep)

@router.get("/", response_model=list[Department])
def list_departments(db: Session = Depends(get_db)):
    return get_departments(db)

@router.get("/{department_id}", response_model=Department)
def get_department(department_id: int, db: Session = Depends(get_db)):
    db_dep = get_department_by_id(db, department_id)
    if not db_dep:
        raise HTTPException(status_code=404, detail="Department not found")
    return db_dep

@router.put("/{department_id}", response_model=Department)
def update_department_route(department_id: int, department_update: DepartmentUpdate, db: Session = Depends(get_db)):
    updated = update_department(db, department_id, department_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Department not found")
    return updated

@router.delete("/{department_id}", response_model=Department)
def delete_department_route(department_id: int, db: Session = Depends(get_db)):
    deleted = delete_department(db, department_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Department not found")
    return deleted
