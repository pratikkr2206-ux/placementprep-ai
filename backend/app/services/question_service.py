from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func
from app.models.question import Question
from app.schemas.question import QuestionCreate
from sqlalchemy.sql.expression import func


def create_question(db: Session, question: QuestionCreate):
    db_question = Question(
        question=question.question,
        answer=question.answer,
        category=question.category,
        role=question.role,
        difficulty=question.difficulty
    )

    db.add(db_question)
    db.commit()
    db.refresh(db_question)

    return db_question


def get_all_questions(db: Session):
    return db.query(Question).all()


def get_question_by_id(db: Session, question_id: int):
    return db.query(Question).filter(
        Question.id == question_id
    ).first()


def update_question(db: Session, question_id: int, updated_question: QuestionCreate):

    question = db.query(Question).filter(
        Question.id == question_id
    ).first()

    if not question:
        return None

    question.question = updated_question.question
    question.answer = updated_question.answer
    question.category = updated_question.category
    question.role = updated_question.role
    question.difficulty = updated_question.difficulty

    db.commit()
    db.refresh(question)

    return question


def delete_question(db: Session, question_id: int):

    question = db.query(Question).filter(
        Question.id == question_id
    ).first()

    if not question:
        return False

    db.delete(question)
    db.commit()

    return True



def get_random_questions(
    db: Session,
    role: str,
    difficulty: str,
    limit: int = 10
):
    """
    Returns random questions matching the selected
    role and difficulty.
    """

    return (
        db.query(Question)
        .filter(
            Question.role == role,
            Question.difficulty == difficulty
        )
        .order_by(func.random())   # PostgreSQL/SQLite
        .limit(limit)
        .all()
    )