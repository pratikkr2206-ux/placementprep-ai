from pydantic import BaseModel


class QuestionCreate(BaseModel):
    question: str
    answer: str
    category: str
    role: str
    difficulty: str


class QuestionResponse(QuestionCreate):
    id: int

    class Config:
        from_attributes = True