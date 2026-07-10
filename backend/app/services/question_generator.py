import json
import re

from app.services.ai_service import model
from app.utils.logger import logger

def generate_questions(role: str, difficulty: str, count: int = 20):
    prompt = f"""
You are an expert technical interviewer.

Generate {count} interview questions.

Role:
{role}

Difficulty:
{difficulty}

Return ONLY valid JSON.

Each object must contain:

[
  {{
    "question": "...",
    "answer": "...",
    "category": "...",
    "role": "{role}",
    "difficulty": "{difficulty}"
  }}
]

Rules:

1. Generate different questions.
2. Cover multiple topics.
3. Keep answers concise.
4. Do not wrap JSON inside markdown.
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    # Remove markdown if Gemini adds it
    text = re.sub(r"^```json", "", text)
    text = re.sub(r"^```", "", text)
    text = re.sub(r"```$", "", text)
    text = text.strip()

    try:
        return json.loads(text)

    except Exception:
        logger.error("Unable to parse AI-generated questions.")
        logger.error(text)
        return []