from sqlalchemy.orm import Session

from app.models.response import Response
from app.models.question import Question
from app.models.score import Score


def get_interview_results(
    db: Session,
    session_id: int,
):
    responses = (
        db.query(Response)
        .filter(
            Response.interview_session_id == session_id
        )
        .all()
    )

    results = []

    total_score = 0

    for response in responses:

        question = (
            db.query(Question)
            .filter(
                Question.id == response.question_id
            )
            .first()
        )

        score = (
            db.query(Score)
            .filter(
                Score.response_id == response.id
            )
            .first()
        )

        if score:
            total_score += score.score

        results.append({

            "question": question.question,

            "user_answer": response.user_answer,

            "score": score.score if score else 0,

            "feedback": score.feedback if score else "No feedback",

            "missing_points": (
                score.missing_points
                if score
                else ""
            ),

            "suggestions": (
                score.suggestions
                if score
                else ""
            ),
        })

    overall = 0

    if len(results) > 0:
        overall = round(total_score / len(results), 2)

    return {
        "overall_score": overall,
        "total_questions": len(results),
        "results": results,
    }