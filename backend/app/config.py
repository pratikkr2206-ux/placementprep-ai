from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # Gemini AI
    GEMINI_API_KEY: str
    GEMINI_MODEL: str
    
    FRONTEND_URL: str = "http://localhost:3000"

    class Config:
        env_file = ".env"
        
print("===== CONFIG DEBUG =====")
print("Default FRONTEND_URL:", Settings.model_fields["FRONTEND_URL"].default)
print("========================")

settings = Settings()