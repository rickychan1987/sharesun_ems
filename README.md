###---After everything done and have going test FastAPI Swagger UI---###
Understanding the Dependency Chain
Your models have these relationships:
Employee depends on → Position and Department
Attendance depends on → Employee
Leave depends on → Employee
Payroll depends on → Employee
Review depends on → Employee (both employee and reviewer)
Announcement optionally depends on → Department
Correct Order to Create Records
Step 1: Start FastAPI Server
bash
# From your project root
uvicorn app.main:app --reload
Then open your browser:
text
http://127.0.0.1:8000/docs
You'll see the Swagger UI with all your endpoints.
Step 2: Create Independent Tables First (No Dependencies)
2.1 Create Departments
Endpoint: POST /departments/
Click on the endpoint → "Try it out" → Enter data:
json
{
  "name": "Engineering",
  "description": "Software development team"
}
Click "Execute"

Create more departments:

json
{
  "name": "HR",
  "description": "Human Resources"
}
json
{
  "name": "Sales",
  "description": "Sales and Marketing"
}
Note the id values returned (e.g., 1, 2, 3) - you'll need these!
2.2 Create Positions
Endpoint: POST /positions/
json
{
  "title": "Software Engineer",
  "description": "Full stack developer"
}
json
{
  "title": "HR Manager",
  "description": "Manages recruitment and employee relations"
}
json
{
  "title": "Sales Executive",
  "description": "Client acquisition and retention"
}
Note the id values returned (e.g., 1, 2, 3)
Step 3: Create Employees (Depends on Department + Position)
Endpoint: POST /employees/
Now use the IDs from departments and positions:
json
{
  "name": "John Doe",
  "position_id": 1,
  "department_id": 1,
  "email": "john.doe@company.com",
  "phone": "555-0101"
}
json
{
  "name": "Jane Smith",
  "position_id": 2,
  "department_id": 2,
  "email": "jane.smith@company.com",
  "phone": "555-0102"
}
json
{
  "name": "Bob Johnson",
  "position_id": 3,
  "department_id": 3,
  "email": "bob.johnson@company.com",
  "phone": "555-0103"
}
Note the employee id values (e.g., 1, 2, 3)
Step 4: Create Dependent Records (Need Employee IDs)
Now you can create records that depend on employees:
4.1 Create Attendance Records
Endpoint: POST /attendance/
json
{
  "employee_id": 1,
  "check_in": "2025-10-22T09:00:00",
  "check_out": "2025-10-22T17:30:00"
}
json
{
  "employee_id": 2,
  "check_in": "2025-10-22T08:45:00",
  "check_out": "2025-10-22T17:00:00"
}
4.2 Create Leave Requests
Endpoint: POST /leaves/
json
{
  "employee_id": 1,
  "start_date": "2025-11-01",
  "end_date": "2025-11-05",
  "reason": "Vacation",
  "status": "pending"
}
json
{
  "employee_id": 3,
  "start_date": "2025-12-20",
  "end_date": "2025-12-31",
  "reason": "Holiday break",
  "status": "approved"
}
4.3 Create Payroll Records
Endpoint: POST /payrolls/

json
{
  "employee_id": 1,
  "base_salary": 75000.00,
  "bonus": 5000.00,
  "deductions": 2000.00,
  "net_pay": 78000.00,
  "pay_date": "2025-10-31"
}
json
{
  "employee_id": 2,
  "base_salary": 65000.00,
  "bonus": 3000.00,
  "deductions": 1500.00,
  "net_pay": 66500.00,
  "pay_date": "2025-10-31"
}
4.4 Create Performance Reviews
Endpoint: POST /reviews/

json
{
  "employee_id": 1,
  "reviewer_id": 2,
  "score": 4.5,
  "date": "2025-10-15",
  "notes": "Excellent performance this quarter"
}
json
{
  "employee_id": 3,
  "reviewer_id": 2,
  "score": 4.0,
  "date": "2025-10-15",
  "notes": "Good sales numbers"
}
4.5 Create Announcements
Endpoint: POST /announcements/

Company-wide announcement (no department):

json
{
  "title": "Holiday Party",
  "message": "Join us for our annual holiday celebration on Dec 15th!",
  "department_id": null
}
Department-specific announcement:

json
{
  "title": "Engineering Team Meeting",
  "message": "All hands meeting on Friday at 3 PM",
  "department_id": 1
}
Summary: Creation Order
✅ Departments (independent)

✅ Positions (independent)

✅ Employees (needs Departments + Positions)

✅ Attendance (needs Employees)

✅ Leaves (needs Employees)

✅ Payrolls (needs Employees)

✅ Reviews (needs Employees)

✅ Announcements (optionally needs Departments)

Viewing Your Data
After creating records, use the GET endpoints to view them:

GET /departments/ - List all departments

GET /employees/ - List all employees

GET /attendance/employee/{employee_id} - See specific employee's attendance

GET /leaves/ - List all leave requests

GET /payrolls/employee/{employee_id} - See employee payroll history

GET /reviews/employee/{employee_id} - See employee reviews

Quick Test Dataset Script
If you want to quickly populate test data, you can also create a simple script:

test_data.py:

python
import requests

BASE_URL = "http://127.0.0.1:8000"

# 1. Create departments
dept1 = requests.post(f"{BASE_URL}/departments/", json={"name": "Engineering", "description": "Tech team"}).json()
dept2 = requests.post(f"{BASE_URL}/departments/", json={"name": "HR", "description": "Human Resources"}).json()

# 2. Create positions
pos1 = requests.post(f"{BASE_URL}/positions/", json={"title": "Software Engineer", "description": "Developer"}).json()
pos2 = requests.post(f"{BASE_URL}/positions/", json={"title": "HR Manager", "description": "HR lead"}).json()

# 3. Create employees
emp1 = requests.post(f"{BASE_URL}/employees/", json={
    "name": "John Doe",
    "position_id": pos1["id"],
    "department_id": dept1["id"],
    "email": "john@company.com"
}).json()

print("Test data created!")
print(f"Employee: {emp1}")
Run it:

bash
python test_data.py
Now you know exactly the order to create data in FastAPI UI! Start with Departments and Positions, then Employees, then everything else.


####---Alembic run and update database if needed---###
# Create a new migration
alembic revision --autogenerate -m "description of changes"

# Apply the migration
alembic upgrade head

# Rollback if needed
alembic downgrade -1