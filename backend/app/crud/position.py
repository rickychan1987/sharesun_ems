from sqlalchemy.orm import Session
from app.models.position import Position
from app.schemas.position import PositionCreate, PositionUpdate

def create_position(db: Session, position: PositionCreate):
    db_position = Position(**position.dict())
    db.add(db_position)
    db.commit()
    db.refresh(db_position)
    return db_position

def get_positions(db: Session, skip=0, limit=100):
    return db.query(Position).offset(skip).limit(limit).all()

def get_position_by_id(db: Session, position_id: int):
    return db.query(Position).filter(Position.id == position_id).first()

def update_position(db: Session, position_id: int, position_update: PositionUpdate):
    db_position = db.query(Position).filter(Position.id == position_id).first()
    if db_position:
        for key, value in position_update.dict(exclude_unset=True).items():
            setattr(db_position, key, value)
        db.commit()
        db.refresh(db_position)
    return db_position

def delete_position(db: Session, position_id: int):
    db_position = db.query(Position).filter(Position.id == position_id).first()
    if db_position:
        db.delete(db_position)
        db.commit()
    return db_position
