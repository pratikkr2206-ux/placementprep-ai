import json
import re

from app.services.ai_service import model


def generate_resume_questions(
    analysis: dict,
    count: int = 10,
):
    prompt = f"""
You are an expert technical interviewer.

Generate {count} interview questions based ONLY on this candidate's resume.

Candidate Information:

{json.dumps(analysis, indent=2)}

Return ONLY valid JSON.

[
  {{
    "question": "...",
    "answer": "...",
    "category": "Resume",
    "role": "Resume Interview",
    "difficulty": "Intermediate"
  }}
]

Rules:

1. Ask about projects.
2. Ask about technologies.
3. Ask about skills.
4. Ask about problem solving.
5. Ask follow-up implementation questions.
6. Do not repeat questions.
7. Do not wrap JSON inside markdown.
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    text = re.sub(r"^```json", "", text)
    text = re.sub(r"^```", "", text)
    text = re.sub(r"```$", "", text)
    text = text.strip()

    try:
        return json.loads(text)

    except Exception:
        return []