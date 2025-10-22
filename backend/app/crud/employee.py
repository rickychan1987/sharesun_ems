from sqlalchemy.orm import Session
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate

def create_employee(db: Session, emp: EmployeeCreate):
    db_emp = Employee(**emp.dict())
    db.add(db_emp)
    db.commit()
    db.refresh(db_emp)
    return db_emp

def get_employees(db: Session, skip=0, limit=100):
    return db.query(Employee).offset(skip).limit(limit).all()

def get_employee_by_id(db: Session, employee_id: int):
    return db.query(Employee).filter(Employee.id == employee_id).first()

def update_employee(db: Session, employee_id: int, emp_update: EmployeeUpdate):
    db_emp = db.query(Employee).filter(Employee.id == employee_id).first()
    if db_emp:
        for key, value in emp_update.dict(exclude_unset=True).items():
            setattr(db_emp, key, value)
        db.commit()
        db.refresh(db_emp)
    return db_emp

def delete_employee(db: Session, employee_id: int):
    db_emp = db.query(Employee).filter(Employee.id == employee_id).first()
    if db_emp:
        db.delete(db_emp)
        db.commit()
    return db_emp
