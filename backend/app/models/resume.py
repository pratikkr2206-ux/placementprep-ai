from sqlalchemy import Column, Integer, ForeignKey, String, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    filename = Column(
        String(255),
        nullable=False,
    )

    resume_text = Column(
        Text,
        nullable=False,
    )

    analysis_json = Column(
        Text,
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    user = relationship(
        "User",
        back_populates="resumes",
    )

    questions = relationship(
        "ResumeQuestion",
        back_populates="resume",
        cascade="all, delete-orphan",
    )