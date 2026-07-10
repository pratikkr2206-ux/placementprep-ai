from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.security import get_current_user

from app.models.user import User

from app.services.ai_service import analyze_resume
from app.services.resume_service import (
    save_resume,
    extract_resume_text,
)

from app.services.resume_database_service import (
    create_resume,
    create_resume_questions,
)

from app.services.resume_question_generator import (
    generate_resume_questions,
)

router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
)


@router.post("/upload")
async def upload_resume(
    resume: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    file_path = save_resume(resume)

    resume_text = extract_resume_text(file_path)

    analysis = analyze_resume(resume_text)

    resume_record = create_resume(
        db=db,
        user_id=current_user.id,
        filename=resume.filename,
        resume_text=resume_text,
        analysis=analysis,
    )

    questions = generate_resume_questions(
        analysis=analysis,
        count=10,
    )

    create_resume_questions(
        db=db,
        resume_id=resume_record.id,
        questions=questions,
    )

    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume_record.id,
        "analysis": analysis,
        "questions_generated": len(questions),
    }