from sqlalchemy import Column, Integer, Float, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Score(Base):
    __tablename__ = "scores"

    id = Column(Integer, primary_key=True, index=True)

    response_id = Column(
        Integer,
        ForeignKey("responses.id"),
        nullable=False,
        unique=True
    )

    score = Column(Float, nullable=False)

    feedback = Column(Text)

    missing_points = Column(Text)

    suggestions = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    response = relationship(
        "Response",
        back_populates="score"
    )