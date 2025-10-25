from pydantic import BaseModel, Field
from typing import Optional

class PositionBase(BaseModel):
    title: str
    description: Optional[str] = Field(None, description="Position description")

class PositionCreate(PositionBase):
    pass

class PositionUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = Field(None, description="Position description")

class Position(PositionBase):
    id: int

    class Config:
        orm_mode = True
