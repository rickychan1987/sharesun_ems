from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.position import PositionCreate, PositionUpdate, Position
from app.crud.position import (
    create_position,
    get_positions,
    get_position_by_id,
    update_position,
    delete_position
)

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

@router.get("/{position_id}", response_model=Position)
def get_position(position_id: int, db: Session = Depends(get_db)):
    db_position = get_position_by_id(db, position_id)
    if not db_position:
        raise HTTPException(status_code=404, detail="Position not found")
    return db_position

@router.put("/{position_id}", response_model=Position)
def update_position_route(position_id: int, position_update: PositionUpdate, db: Session = Depends(get_db)):
    updated = update_position(db, position_id, position_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Position not found")
    return updated

@router.delete("/{position_id}", response_model=Position)
def delete_position_route(position_id: int, db: Session = Depends(get_db)):
    deleted = delete_position(db, position_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Position not found")
    return deleted
