from fastapi import FastAPI
<<<<<<< HEAD
from app.api.routers import employee, department, position, attendance, leave, payroll, review, announcement
=======
from app.api.routers import employee, department, position
>>>>>>> 65b951c9a3d18676f7316128c79c9f99fdee6861

app = FastAPI(title="EMS")

app.include_router(employee.router, prefix="/employees", tags=["employees"])
app.include_router(department.router, prefix="/departments", tags=["departments"])
<<<<<<< HEAD
app.include_router(position.router, prefix="/positions", tags=["positions"])
app.include_router(attendance.router, prefix="/attendance", tags=["attendance"])
app.include_router(leave.router, prefix="/leave", tags=["leave"])
app.include_router(payroll.router, prefix="/payroll", tags=["payroll"])
app.include_router(review.router, prefix="/review", tags=["review"])
app.include_router(announcement.router, prefix="/announcement", tags=["announcement"])
=======
app.include_router(position.router, prefix="/position", tags=["position"])
>>>>>>> 65b951c9a3d18676f7316128c79c9f99fdee6861
