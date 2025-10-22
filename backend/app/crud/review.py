from sqlalchemy.orm import Session
from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewUpdate

def create_review(db: Session, review: ReviewCreate):
    db_review = Review(**review.dict())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

def get_reviews(db: Session, skip=0, limit=100):
    return db.query(Review).offset(skip).limit(limit).all()

def get_review_by_id(db: Session, review_id: int):
    return db.query(Review).filter(Review.id == review_id).first()

def update_review(db: Session, review_id: int, review_update: ReviewUpdate):
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if db_review:
        for key, value in review_update.dict(exclude_unset=True).items():
            setattr(db_review, key, value)
        db.commit()
        db.refresh(db_review)
    return db_review

def delete_review(db: Session, review_id: int):
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if db_review:
        db.delete(db_review)
        db.commit()
    return db_review

def get_reviews_by_employee(db: Session, employee_id: int, skip=0, limit=100):
    return db.query(Review).filter(Review.employee_id == employee_id).offset(skip).limit(limit).all()
