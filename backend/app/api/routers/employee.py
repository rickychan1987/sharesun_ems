from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.employee import EmployeeCreate, EmployeeUpdate, Employee
from app.crud.employee import (
    create_employee,
    get_employees,
    get_employee_by_id,
    update_employee,
    delete_employee
)
from app.core.deps import get_current_active_user, require_admin_or_manager

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Update your existing routes to include authentication
@router.post("/", response_model=Employee)
def add_employee(emp: EmployeeCreate, db: Session = Depends(get_db), current_user = Depends(require_admin_or_manager)):
    return create_employee(db, emp)

@router.get("/", response_model=list[Employee])
def list_employees(db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    return get_employees(db)

@router.get("/{employee_id}", response_model=Employee)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    db_emp = get_employee_by_id(db, employee_id)
    if not db_emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_emp

@router.put("/{employee_id}", response_model=Employee)
def update_employee_route(employee_id: int, emp_update: EmployeeUpdate, db: Session = Depends(get_db), current_user = Depends(require_admin_or_manager)):
    updated = update_employee(db, employee_id, emp_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Employee not found")
    return updated

@router.delete("/{employee_id}", response_model=Employee)
def delete_employee_route(employee_id: int, db: Session = Depends(get_db)):
    deleted = delete_employee(db, employee_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Employee not found")
    return deleted