from fastapi import APIRouter, Depends, HTTPException, logger
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.security import get_current_user

from app.models.user import User
from app.models.response import Response
from app.models.question import Question

from app.schemas.response import ResponseCreate

from app.services.response_service import (
    create_response,
    get_responses_by_session,
)

from app.services.ai_service import evaluate_answer
from app.services.score_service import create_score

router = APIRouter(
    prefix="/responses",
    tags=["Responses"],
)


@router.post("/")
def submit_response(
    response: ResponseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Save user's response
    new_response = Response(
        interview_session_id=response.interview_session_id,
        question_id=response.question_id,
        user_answer=response.user_answer,
    )

    create_response(db, new_response)

    # Get the original question
    question = (
        db.query(Question)
        .filter(Question.id == response.question_id)
        .first()
    )

    if question is None:
        raise HTTPException(
            status_code=404,
            detail="Question not found",
        )

    # Default evaluation (used if AI fails)
    ai_result = {
        "score": 0,
        "feedback": "AI evaluation failed.",
        "missing_points": "",
        "suggestions": "",
    }

    try:
        ai_result = evaluate_answer(
            question=question.question,
            expected_answer=question.answer,
            user_answer=response.user_answer,
        )

        create_score(
            db=db,
            response_id=new_response.id,
            ai_result=ai_result,
        )

    except Exception as e:
        db.rollback()

        logger.error(f"AI Evaluation Error: {e}")

        ai_result = {
            "score": 0,
            "feedback": "AI evaluation is temporarily unavailable due to API rate limits.",
            "missing_points": "",
            "suggestions": "Please try again in a few seconds.",
        }

        create_score(
            db=db,
            response_id=new_response.id,
            ai_result=ai_result,
        )
    return {
        "message": "Response submitted successfully",
        "response_id": new_response.id,
        "evaluation": ai_result,
    }


@router.get("/{session_id}")
def get_session_responses(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_responses_by_session(db, session_id)