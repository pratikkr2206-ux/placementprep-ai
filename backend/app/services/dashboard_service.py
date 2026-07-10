from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.interview_session import InterviewSession
from app.models.response import Response
from app.models.score import Score
from app.models.question import Question


def get_dashboard_stats(
    db: Session,
    user_id: int,
):
    total_interviews = (
        db.query(InterviewSession)
        .filter(
            InterviewSession.user_id == user_id
        )
        .count()
    )

    questions_solved = (
        db.query(Response)
        .join(
            InterviewSession,
            Response.interview_session_id == InterviewSession.id,
        )
        .filter(
            InterviewSession.user_id == user_id
        )
        .count()
    )

    average_score = (
    db.query(func.avg(Score.score))
    .join(Response)
    .join(
        InterviewSession,
        Response.interview_session_id == InterviewSession.id,
    )
    .filter(
        InterviewSession.user_id == user_id,
        Score.score >= 0,
    )
    .scalar()
)

    best_score = (
    db.query(func.max(Score.score))
    .join(Response)
    .join(
        InterviewSession,
        Response.interview_session_id == InterviewSession.id,
    )
    .filter(
        InterviewSession.user_id == user_id,
        Score.score >= 0,
    )
    .scalar()
)

    # Last 5 interview scores
    recent_scores = (
    db.query(Score.score)
    .join(Response)
    .join(
        InterviewSession,
        Response.interview_session_id == InterviewSession.id,
    )
    .filter(
        InterviewSession.user_id == user_id,
        Score.score >= 0,
    )
    .order_by(InterviewSession.created_at.desc())
    .limit(5)
    .all()
)

    recent_scores = [
        round(score[0], 2)
        for score in reversed(recent_scores)
    ]

    # Category-wise average scores
    category_scores = (
    db.query(
        Question.category,
        func.avg(Score.score),
    )
    .join(Response, Response.question_id == Question.id)
    .join(
        InterviewSession,
        Response.interview_session_id == InterviewSession.id,
    )
    .join(
        Score,
        Score.response_id == Response.id,
    )
    .filter(
        InterviewSession.user_id == user_id,
        Score.score >= 0,
    )
    .group_by(Question.category)
    .all()
)

    categories = [
        {
            "category": row[0],
            "average": round(row[1], 2)
        }
        for row in category_scores
    ]
    # AI Performance Insights

    strengths = [
        item["category"]
        for item in categories
        if item["average"] >= 80
    ]

    improvements = [
        item["category"]
        for item in categories
        if item["average"] < 70
    ]

    return {
    "interviews_completed": total_interviews,
    "questions_solved": questions_solved,
    "average_score": round(average_score or 0, 2),
    "best_score": best_score or 0,

    "recent_scores": recent_scores,

    "category_scores": categories,

    "strengths": strengths,

    "improvements": improvements,
}