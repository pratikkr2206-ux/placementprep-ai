from datetime import datetime
from pydantic import BaseModel


class InterviewHistory(BaseModel):
    session_id: int
    role: str
    difficulty: str
    status: str
    average_score: float
    created_at: datetime

    class Config:
        from_attributes = True