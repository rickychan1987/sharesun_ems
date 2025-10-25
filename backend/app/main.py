from fastapi import FastAPI
from app.api.routers import employee, department, position

app = FastAPI(title="EMS")

app.include_router(employee.router, prefix="/employees", tags=["employees"])
app.include_router(department.router, prefix="/departments", tags=["departments"])
app.include_router(position.router, prefix="/position", tags=["position"])
