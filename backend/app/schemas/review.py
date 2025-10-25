from pydantic import BaseModel
from datetime import date

class ReviewBase(BaseModel):
    employee_name: str
    reviewer_name: str
    score: float
    date: date
    notes: str = None

class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate(BaseModel):
    employee_name: str = None
    reviewer_name: str = None
    score: float = None
    date: date = None
    notes: str = None

class Review(ReviewBase):
    id: int

    class Config:
        orm_mode = True
