from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.review import ReviewCreate, ReviewUpdate, Review
from app.crud.review import (
    create_review,
    get_reviews,
    get_review_by_id,
    update_review,
    delete_review,
    get_reviews_by_employee
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Review)
def add_review(review: ReviewCreate, db: Session = Depends(get_db)):
    return create_review(db, review)

@router.get("/", response_model=list[Review])
def list_reviews(db: Session = Depends(get_db)):
    return get_reviews(db)

@router.get("/{review_id}", response_model=Review)
def get_review(review_id: int, db: Session = Depends(get_db)):
    db_review = get_review_by_id(db, review_id)
    if not db_review:
        raise HTTPException(status_code=404, detail="Review not found")
    return db_review

@router.put("/{review_id}", response_model=Review)
def update_review_route(review_id: int, review_update: ReviewUpdate, db: Session = Depends(get_db)):
    updated = update_review(db, review_id, review_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Review not found")
    return updated

@router.delete("/{review_id}", response_model=Review)
def delete_review_route(review_id: int, db: Session = Depends(get_db)):
    deleted = delete_review(db, review_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Review not found")
    return deleted

@router.get("/employee/{employee_id}", response_model=list[Review])
def get_employee_reviews(employee_id: int, db: Session = Depends(get_db)):
    return get_reviews_by_employee(db, employee_id)
