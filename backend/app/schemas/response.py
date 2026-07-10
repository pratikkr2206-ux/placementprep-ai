from pydantic import BaseModel


class ResponseCreate(BaseModel):
    interview_session_id: int
    question_id: int
    user_answer: str


class ResponseRead(BaseModel):
    id: int
    interview_session_id: int
    question_id: int
    user_answer: str

    class Config:
        from_attributes = True