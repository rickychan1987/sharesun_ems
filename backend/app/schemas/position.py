from pydantic import BaseModel

class PositionBase(BaseModel):
    title: str
    description: str = None

class PositionCreate(PositionBase):
    pass

class Position(PositionBase):
    id: int

    class Config:
        orm_mode = True
