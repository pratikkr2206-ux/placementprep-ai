from pydantic import BaseModel


class ResultItem(BaseModel):
    question: str
    user_answer: str
    score: float
    feedback: str
    missing_points: str
    suggestions: str


class InterviewResult(BaseModel):
    overall_score: float
    total_questions: int
    results: list[ResultItem]