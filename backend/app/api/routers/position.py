from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.position import PositionCreate, Position
from app.crud.position import create_position, get_positions

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Position)
def add_position(position: PositionCreate, db: Session = Depends(get_db)):
    return create_position(db, position)

@router.get("/", response_model=list[Position])
def list_positions(db: Session = Depends(get_db)):
    return get_positions(db)
