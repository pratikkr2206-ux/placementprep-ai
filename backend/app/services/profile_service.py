from sqlalchemy.orm import Session

from app.models.user import User


def update_profile(
    db: Session,
    user: User,
    full_name: str,
    email: str,
):
    user.full_name = full_name
    user.email = email

    db.commit()
    db.refresh(user)

    return user