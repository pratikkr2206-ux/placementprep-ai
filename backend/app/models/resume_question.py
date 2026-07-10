from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    Text,
    String,
    DateTime,
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class ResumeQuestion(Base):
    __tablename__ = "resume_questions"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False,
    )

    question = Column(
        Text,
        nullable=False,
    )

    answer = Column(
        Text,
        nullable=False,
    )

    category = Column(
        String(50),
        nullable=False,
    )

    difficulty = Column(
        String(30),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    resume = relationship(
        "Resume",
        back_populates="questions",
    )