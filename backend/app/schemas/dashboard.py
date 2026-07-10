from pydantic import BaseModel


from pydantic import BaseModel


class CategoryScore(BaseModel):
    category: str
    average: float


class DashboardStats(BaseModel):
    interviews_completed: int
    questions_solved: int
    average_score: float
    best_score: float
    recent_scores: list[float]
    category_scores: list[CategoryScore]
    strengths: list[str]
    improvements: list[str]