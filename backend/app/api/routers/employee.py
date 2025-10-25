from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status, Query
from typing import Optional, List
import json
from sqlalchemy.orm import Session
import os
from uuid import uuid4
from ...db.session import SessionLocal
from ...schemas.employee import Employee, EmployeeCreate, EmployeeUpdate
from ...crud.employee import crud_employee

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Configure upload directory
UPLOAD_DIR = "static/uploads/employees"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_photo_file(photo: UploadFile) -> str:
    """Save uploaded photo and return file path"""
    file_extension = photo.filename.split('.')[-1] if photo.filename else 'jpg'
    filename = f"{uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        content = photo.file.read()
        buffer.write(content)
    
    return f"/{file_path}"

@router.get("/", response_model=List[Employee])
def get_all_employees(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    db: Session = Depends(get_db)
):
    """
    Get all employees with pagination
    """
    try:
        employees = crud_employee.get_multi(db, skip=skip, limit=limit)
        
        # Debug: Check each employee's positionid
        for emp in employees:
            if emp.positionid is None:
                print(f"WARNING: Employee {emp.id} has null positionid")
        
        return employees
    except Exception as e:
        print(f"Error in get_all_employees: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching employees: {str(e)}"
        )

@router.get("/{employee_id}", response_model=Employee)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    """
    Get employee by ID
    """
    try:
        db_employee = crud_employee.get(db, employee_id)
        if db_employee is None:
            raise HTTPException(status_code=404, detail="Employee not found")
        
        # Ensure positionid is not None
        if db_employee.positionid is None:
            print(f"WARNING: Employee {employee_id} has null positionid")
            # You might want to set a default positionid or handle this case
        
        return db_employee
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching employee {employee_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching employee: {str(e)}"
        )

@router.post("/", response_model=Employee, status_code=status.HTTP_201_CREATED)
async def create_employee(
    employee_data: str = Form(...),
    photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """
    Create new employee with optional photo
    """
    try:
        # Parse JSON data from form field
        employee_dict = json.loads(employee_data)
        
        # Handle photo upload
        photo_url = None
        if photo and photo.filename:
            photo_url = save_photo_file(photo)
        
        # Validate and create employee
        employee_create = EmployeeCreate(**employee_dict)
        return crud_employee.create_with_photo(db, obj_in=employee_create, photo_url=photo_url)
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON data")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating employee: {str(e)}")

@router.put("/{employee_id}", response_model=Employee)
async def update_employee(
    employee_id: int,
    employee_data: str = Form(...),
    photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    try:
        employee_dict = json.loads(employee_data)
        print(f"Updating employee {employee_id} with data: {employee_dict}")  # Debug log
        
        # Check if employee exists
        existing_employee = crud_employee.get(db, employee_id)
        if not existing_employee:
            raise HTTPException(status_code=404, detail="Employee not found")
        
        # Handle photo upload
        photo_url = None
        if photo and photo.filename:
            photo_url = save_photo_file(photo)
            # Optionally delete old photo
            if existing_employee.photo_url:
                old_photo_path = existing_employee.photo_url.lstrip('/')
                if os.path.exists(old_photo_path):
                    os.remove(old_photo_path)
        
        # Convert string values to appropriate types
        if 'positionid' in employee_dict and employee_dict['positionid']:
            employee_dict['positionid'] = int(employee_dict['positionid'])
        
        employee_update = EmployeeUpdate(**employee_dict)
        result = crud_employee.update_with_photo(
            db, id=employee_id, obj_in=employee_update, photo_url=photo_url
        )
        print(f"Update successful: {result}")  # Debug log
        return result
        
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")  # Debug log
        raise HTTPException(status_code=400, detail="Invalid JSON data")
    except ValueError as e:
        print(f"Value error: {e}")  # Debug log
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Unexpected error: {e}")  # Debug log
        raise HTTPException(status_code=500, detail=f"Error updating employee: {str(e)}")

@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    """
    Delete employee by ID
    """
    try:
        success = crud_employee.delete(db, employee_id)
        if not success:
            raise HTTPException(status_code=404, detail="Employee not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting employee: {str(e)}"
        )

@router.get("/search/", response_model=List[Employee])
def search_employees(
    q: str = Query(..., min_length=1, description="Search query"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    """
    Search employees by name, employee ID, or email
    """
    try:
        employees = crud_employee.search(db, query=q, skip=skip, limit=limit)
        return employees
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error searching employees: {str(e)}"
        )