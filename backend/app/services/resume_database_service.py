import json

from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.models.resume_question import ResumeQuestion


def create_resume(
    db: Session,
    user_id: int,
    filename: str,
    resume_text: str,
    analysis: dict,
):
    resume = Resume(
        user_id=user_id,
        filename=filename,
        resume_text=resume_text,
        analysis_json=json.dumps(analysis),
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume


def create_resume_questions(
    db: Session,
    resume_id: int,
    questions: list,
):
    for item in questions:

        db.add(
            ResumeQuestion(
                resume_id=resume_id,
                question=item["question"],
                answer=item["answer"],
                category=item["category"],
                difficulty=item["difficulty"],
            )
        )

    db.commit()