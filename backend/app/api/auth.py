from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database.database import get_db
from app.models.user import User
from app.schemas.user import (
    UserCreate,
    UserLogin,
    ForgotPasswordRequest,
    ResetPasswordRequest,
)
from app.auth.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_password_reset_token,
    verify_password_reset_token,
    get_current_user,
)
from app.services.user_service import (
    get_user_by_email,
    create_user,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing = get_user_by_email(db, user.email)

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hash_password(user.password),
    )

    create_user(db, new_user)

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    existing = get_user_by_email(db, form_data.username)

    if not existing:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        form_data.password,
        existing.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        {"sub": existing.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    user = get_user_by_email(
        db,
        request.email,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="No account found with this email.",
        )

    reset_token = create_password_reset_token(
        user.email
    )

    # For development.
    # Later we'll email this instead.
    return {
        "message": "Password reset token generated successfully.",
        "reset_token": reset_token,
    }
    
    
@router.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    email = verify_password_reset_token(
        request.token
    )

    if email is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired reset token.",
        )

    user = get_user_by_email(
        db,
        email,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    user.hashed_password = hash_password(
        request.new_password
    )

    db.commit()

    return {
        "message": "Password reset successful."
    }

@router.get("/me")
def me(current_user: User = Depends(get_current_user)):

    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
    }