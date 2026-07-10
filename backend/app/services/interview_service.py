from sqlalchemy.orm import Session

from app.models.interview_session import InterviewSession
from app.models.question import Question

from app.schemas.interview import InterviewStart
from app.utils.constants import (
    QUESTION_BANK_SIZE,
)
from app.models.resume_question import ResumeQuestion
from app.utils.constants import INTERVIEW_QUESTION_COUNT
from app.services.question_service import get_random_questions
from app.services.question_generator import generate_questions

def start_interview(
    db: Session,
    user_id: int,
    interview: InterviewStart
):
    interview_session = InterviewSession(
        user_id=user_id,
        role=interview.role,
        difficulty=interview.difficulty,
        status="In Progress"
    )

    db.add(interview_session)
    db.commit()
    db.refresh(interview_session)

    return interview_session

def ensure_question_bank(
    db: Session,
    role: str,
    difficulty: str,
):
    total_questions = (
        db.query(Question)
        .filter(
            Question.role == role,
            Question.difficulty == difficulty,
        )
        .count()
    )

    if total_questions >= QUESTION_BANK_SIZE:
        return

    # Generate additional questions if needed

    ai_questions = generate_questions(
        role=role,
        difficulty=difficulty,
        count=QUESTION_BANK_SIZE - total_questions,
    )

    for item in ai_questions:

        exists = (
            db.query(Question)
            .filter(
                Question.question == item["question"]
            )
            .first()
        )

        if exists:
            continue

        db.add(
            Question(
                question=item["question"],
                answer=item["answer"],
                category=item["category"],
                role=item["role"],
                difficulty=item["difficulty"],
            )
        )

    db.commit()

    # Question bank successfully updated

def fetch_interview_questions(
    db: Session,
    session_id: int,
):
    session = (
        db.query(InterviewSession)
        .filter(
            InterviewSession.id == session_id
        )
        .first()
    )

    if not session:
        return None

    if session.resume_id:

        return (
            db.query(ResumeQuestion)
            .filter(
                ResumeQuestion.resume_id == session.resume_id
            )
            .all()
        )

    ensure_question_bank(
        db=db,
        role=session.role,
        difficulty=session.difficulty,
    )

    return get_random_questions(
        db=db,
        role=session.role,
        difficulty=session.difficulty,
        limit=10,
    )