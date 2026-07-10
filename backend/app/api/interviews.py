from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.security import get_current_user
from app.models.user import User
from app.schemas.interview import InterviewStart, InterviewResponse
from app.services.interview_service import start_interview
from typing import List
from fastapi import HTTPException
from app.schemas.interview import InterviewQuestion
from app.services.interview_service import fetch_interview_questions

router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"]
)


@router.post("/start", response_model=InterviewResponse)
def create_interview(
    interview: InterviewStart,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    session = start_interview(
        db=db,
        user_id=current_user.id,
        interview=interview
    )
    
    return InterviewResponse(
        session_id=session.id,
        message="Interview started successfully"
    )
    
@router.get(
    "/{session_id}/questions",
    response_model=List[InterviewQuestion]
)
def get_questions(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    questions = fetch_interview_questions(
        db=db,
        session_id=session_id
    )

    if questions is None:
        raise HTTPException(
            status_code=404,
            detail="Interview session not found"
        )

    return questions