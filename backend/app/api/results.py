from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.security import get_current_user
from app.models.user import User

from app.schemas.result import InterviewResult
from app.services.result_service import get_interview_results

router = APIRouter(
    prefix="/results",
    tags=["Results"],
)


@router.get(
    "/{session_id}",
    response_model=InterviewResult,
)
def interview_results(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_interview_results(
        db=db,
        session_id=session_id,
    )