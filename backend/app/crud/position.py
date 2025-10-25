from sqlalchemy.orm import Session
from app.models.position import Position
from app.schemas.position import PositionCreate

def create_position(db: Session, position: PositionCreate):
    db_position = Position(**position.dict())
    db.add(db_position)
    db.commit()
    db.refresh(db_position)
    return db_position

def get_positions(db: Session, skip=0, limit=100):
    return db.query(Position).offset(skip).limit(limit).all()
