from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.models.resume_question import ResumeQuestion
from app.models.interview_session import InterviewSession


def start_resume_interview(
    db: Session,
    user_id: int,
    resume_id: int,
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == user_id,
        )
        .first()
    )

    if not resume:
        return None

    session = InterviewSession(
        user_id=user_id,
        resume_id=resume_id,
        role="Resume Interview",
        difficulty="Intermediate",
        status="In Progress",
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session


def get_resume_questions(
    db: Session,
    resume_id: int,
):
    return (
        db.query(ResumeQuestion)
        .filter(
            ResumeQuestion.resume_id == resume_id
        )
        .all()
    )