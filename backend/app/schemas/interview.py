from pydantic import BaseModel


class InterviewStart(BaseModel):
    role: str
    difficulty: str


class InterviewResponse(BaseModel):
    session_id: int
    message: str


class InterviewQuestion(BaseModel):
    id: int
    question: str
    category: str
    role: str
    difficulty: str

    class Config:
        from_attributes = True