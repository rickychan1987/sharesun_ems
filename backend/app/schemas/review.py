from pydantic import BaseModel
from datetime import date

class ReviewBase(BaseModel):
    employee_id: int
    reviewer_id: int
    score: float
    date: date
    notes: str = None

class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate(BaseModel):
    reviewer_id: int = None
    score: float = None
    date: date = None
    notes: str = None

class Review(ReviewBase):
    id: int

    class Config:
        orm_mode = True
