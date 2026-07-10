from sqlalchemy.orm import Session

from app.models.score import Score


def create_score(
    db: Session,
    response_id: int,
    ai_result: dict,
):
    # Convert list fields to strings before saving

    missing_points = ai_result.get("missing_points", "")
    suggestions = ai_result.get("suggestions", "")

    if isinstance(missing_points, list):
        missing_points = "\n".join(missing_points)

    if isinstance(suggestions, list):
        suggestions = "\n".join(suggestions)

    score = Score(
        response_id=response_id,
        score=ai_result.get("score", 0),
        feedback=ai_result.get("feedback", ""),
        missing_points=missing_points,
        suggestions=suggestions,
    )

    db.add(score)
    db.commit()
    db.refresh(score)

    return score