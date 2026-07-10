from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.security import get_current_user
from app.models.user import User

from app.schemas.history import InterviewHistory
from app.services.history_service import get_user_history

router = APIRouter(
    prefix="/history",
    tags=["History"],
)


@router.get(
    "/",
    response_model=List[InterviewHistory],
)
def history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_user_history(
        db=db,
        user_id=current_user.id,
    )