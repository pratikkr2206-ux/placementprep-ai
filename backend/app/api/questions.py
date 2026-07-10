from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from fastapi import Query
from app.database.database import get_db
from app.schemas.question import QuestionCreate, QuestionResponse
from app.services.question_service import (
    create_question,
    get_all_questions,
    get_question_by_id,
    update_question,
    delete_question,
)

router = APIRouter(
    prefix="/questions",
    tags=["Questions"]
)


@router.post("/", response_model=QuestionResponse)
def add_question(
    question: QuestionCreate,
    db: Session = Depends(get_db)
):
    return create_question(db, question)


@router.get("/", response_model=list[QuestionResponse])
def fetch_questions(
    db: Session = Depends(get_db)
):
    return get_all_questions(db)



@router.get("/", response_model=list[QuestionResponse])
def fetch_questions(
    role: Optional[str] = Query(None),
    difficulty: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):

    questions = get_all_questions(db)

    if role:
        questions = [
            q for q in questions
            if q.role.lower() == role.lower()
        ]

    if difficulty:
        questions = [
            q for q in questions
            if q.difficulty.lower() == difficulty.lower()
        ]

    return questions


@router.put("/{question_id}", response_model=QuestionResponse)
def edit_question(
    question_id: int,
    updated_question: QuestionCreate,
    db: Session = Depends(get_db)
):
    question = update_question(
        db,
        question_id,
        updated_question,
    )

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    return question


@router.delete("/{question_id}")
def remove_question(
    question_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_question(db, question_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    return {
        "message": "Question deleted successfully"
    }