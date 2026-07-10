from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        from_attributes = True


# ----------------------------
# Forgot Password
# ----------------------------

class ForgotPasswordRequest(BaseModel):
    email: EmailStr


# ----------------------------
# Reset Password
# ----------------------------

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str