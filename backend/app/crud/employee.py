from sqlalchemy.orm import Session
from typing import Optional, List
from ..models.employee import Employee
from ..schemas.employee import EmployeeCreate, EmployeeUpdate

class CRUDEmployee:
    def get(self, db: Session, id: int) -> Optional[Employee]:
        return db.query(Employee).filter(Employee.id == id).first()
    
    def get_by_employee_id(self, db: Session, employee_id: str) -> Optional[Employee]:
        return db.query(Employee).filter(Employee.employeeid == employee_id).first()
    
    def get_multi(self, db: Session, skip: int = 0, limit: int = 100) -> List[Employee]:
        # Ensure we're loading the relationship if needed
        return db.query(Employee).offset(skip).limit(limit).all()
    
    def create_with_photo(self, db: Session, obj_in: EmployeeCreate, photo_url: Optional[str] = None) -> Employee:
        # Check if employee ID already exists
        if self.get_by_employee_id(db, obj_in.employeeid):
            raise ValueError("Employee ID already exists")
        
        # Ensure positionid is not None
        if obj_in.positionid is None:
            raise ValueError("positionid is required")
        
        db_obj = Employee(
            **obj_in.model_dump(exclude_unset=True),
            photo_url=photo_url
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def update_with_photo(self, db: Session, id: int, obj_in: EmployeeUpdate, photo_url: Optional[str] = None) -> Employee:
        db_obj = self.get(db, id)
        if not db_obj:
            raise ValueError("Employee not found")
        
        update_data = obj_in.model_dump(exclude_unset=True)
        if photo_url:
            update_data['photo_url'] = photo_url
            
        for field, value in update_data.items():
            if value is not None:  # Only update if value is provided
                setattr(db_obj, field, value)
            
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def delete(self, db: Session, id: int) -> bool:
        db_obj = self.get(db, id)
        if db_obj:
            db.delete(db_obj)
            db.commit()
            return True
        return False
    
    def search(self, db: Session, query: str, skip: int = 0, limit: int = 100) -> List[Employee]:
        return db.query(Employee).filter(
            Employee.name.ilike(f"%{query}%") |
            Employee.employeeid.ilike(f"%{query}%") |
            Employee.email.ilike(f"%{query}%")
        ).offset(skip).limit(limit).all()

crud_employee = CRUDEmployee()