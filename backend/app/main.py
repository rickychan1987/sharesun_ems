from fastapi import FastAPI
from app.api.routers import employee, department, position, attendance, leave, payroll, review, announcement, auth

app = FastAPI(title="EMS - Employee Management System")

# Authentication routes
app.include_router(auth.router, prefix="/auth", tags=["authentication"])

# Other routes
app.include_router(employee.router, prefix="/employees", tags=["employees"])
app.include_router(department.router, prefix="/departments", tags=["departments"])
app.include_router(position.router, prefix="/positions", tags=["positions"])
app.include_router(attendance.router, prefix="/attendance", tags=["attendance"])
app.include_router(leave.router, prefix="/leaves", tags=["leaves"])
app.include_router(payroll.router, prefix="/payrolls", tags=["payrolls"])
app.include_router(review.router, prefix="/reviews", tags=["reviews"])
app.include_router(announcement.router, prefix="/announcements", tags=["announcements"])
app.include_router(auth.router, prefix="/auth", tags=["authentication"])

@app.get("/")
def root():
    return {"message": "Welcome to EMS API"}
