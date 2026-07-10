from sqlalchemy.orm import Session

from app.models.response import Response


def create_response(
    db: Session,
    response: Response,
):
    db.add(response)
    db.commit()
    db.refresh(response)

    return response


def get_responses_by_session(
    db: Session,
    session_id: int,
):
    return (
        db.query(Response)
        .filter(
            Response.interview_session_id == session_id
        )
        .all()
    )