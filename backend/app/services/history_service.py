from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.interview_session import InterviewSession
from app.models.response import Response
from app.models.score import Score


def get_user_history(db: Session, user_id: int):
    interviews = (
        db.query(InterviewSession)
        .filter(InterviewSession.user_id == user_id)
        .order_by(InterviewSession.id.desc())
        .all()
    )

    history = []

    for interview in interviews:

        average = (
            db.query(func.avg(Score.score))
            .join(Response, Response.id == Score.response_id)
            .filter(
                Response.interview_session_id == interview.id
            )
            .scalar()
        )

        history.append({
            "session_id": interview.id,
            "role": interview.role,
            "difficulty": interview.difficulty,
            "status": interview.status,
            "average_score": round(average, 2) if average else 0,
            "created_at": interview.created_at,
        })

    return history