from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


from app.database.database import Base


class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True, index=True)
    

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=True,
    )

    role = Column(String(50), nullable=False)

    difficulty = Column(String(20), nullable=False)

    status = Column(String(20), default="In Progress")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="interview_sessions"
    )
    resume = relationship(
        "Resume",
    )
    
    responses = relationship(
        "Response",
        back_populates="interview_session",
        cascade="all, delete-orphan"
    )