from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.security import get_current_user
from app.models.user import User

from app.services.resume_interview_service import (
    start_resume_interview,
    get_resume_questions,
)

router = APIRouter(
    prefix="/resume",
    tags=["Resume Interview"],
)


@router.post("/{resume_id}/start")
def start_interview(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    session = start_resume_interview(
        db=db,
        user_id=current_user.id,
        resume_id=resume_id,
    )

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    return {
        "session_id": session.id,
        "message": "Resume interview started",
    }


@router.get("/{resume_id}/questions")
def fetch_questions(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_resume_questions(
        db=db,
        resume_id=resume_id,
    )