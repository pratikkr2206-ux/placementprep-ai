from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.dashboard import router as dashboard_router
from app.database.database import Base, engine
from app.api.responses import router as response_router
from app.models.user import User
from app.models.question import Question
from app.models.interview_session import InterviewSession
from app.models.response import Response
from app.models.score import Score
from app.api.results import router as result_router
from app.api.auth import router as auth_router
from app.api.questions import router as question_router
from app.api.interviews import router as interview_router
from app.api.history import router as history_router
from app.api.profile import router as profile_router
from app.api.resume import router as resume_router
from app.utils.exception_handler import global_exception_handler
from app.models.resume import Resume
from app.models.resume_question import ResumeQuestion
from app.api.resume_interview import router as resume_interview_router
from app.config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PlacementPrep AI",
    version="1.0"
)
app.add_exception_handler(
    Exception,
    global_exception_handler,
)

# Allow the Next.js frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        #"http://localhost:3000",
        settings.FRONTEND_URL,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(question_router)
app.include_router(interview_router)
app.include_router(response_router)
app.include_router(result_router)
app.include_router(history_router)
app.include_router(dashboard_router)
app.include_router(profile_router)
app.include_router(resume_router)
app.include_router(resume_interview_router)

@app.get("/")
def home():
    return {
        "message": "PlacementPrep AI Backend Running"
    }
    
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "PlacementPrep AI",
    }