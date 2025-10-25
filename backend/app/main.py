from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.api.routers import (
    auth, position, department, employee, attendance, 
    leave, payroll, review, announcement
)

# Create FastAPI app with proper docs configuration
app = FastAPI(
    title="EMS API",
    description="Employee Management System API",
    version="1.0.0",
    docs_url="/api/docs",  # Explicitly set docs URL
    redoc_url="/api/redoc",  # Explicitly set redoc URL
    openapi_url="/api/openapi.json"  # Explicitly set OpenAPI URL
)

# Create static directory for file serving
os.makedirs("static/uploads", exist_ok=True)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Enhanced CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Register all routers - ORDER MATTERS!
app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(position.router, prefix="/positions", tags=["positions"])
app.include_router(department.router, prefix="/departments", tags=["departments"])
app.include_router(employee.router, prefix="/employees", tags=["employees"])
app.include_router(attendance.router, prefix="/attendances", tags=["attendances"])
app.include_router(leave.router, prefix="/leaves", tags=["leaves"])
app.include_router(payroll.router, prefix="/payrolls", tags=["payrolls"])
app.include_router(review.router, prefix="/reviews", tags=["reviews"])
app.include_router(announcement.router, prefix="/announcements", tags=["announcements"])

@app.get("/")
def root():
    return {"message": "Welcome to EMS API", "docs": "/api/docs"}

