from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.security import get_current_user
from app.models.user import User

from app.schemas.profile import (
    ProfileResponse,
    ProfileUpdate,
)

from app.services.profile_service import (
    update_profile,
)

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


@router.get(
    "/",
    response_model=ProfileResponse,
)
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.put(
    "/",
    response_model=ProfileResponse,
)
def edit_profile(
    profile: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return update_profile(
        db=db,
        user=current_user,
        full_name=profile.full_name,
        email=profile.email,
    )