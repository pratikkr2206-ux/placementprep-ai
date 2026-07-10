import json
import re

import google.generativeai as genai
from app.utils.logger import logger
from app.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel(settings.GEMINI_MODEL)


def evaluate_answer(
    question: str,
    expected_answer: str,
    user_answer: str,
):
    prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's answer.

Question:
{question}

Expected Answer:
{expected_answer}

Candidate Answer:
{user_answer}

Return ONLY valid JSON.

{{
    "score": 85,
    "feedback": "...",
    "missing_points": "...",
    "suggestions": "..."
}}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    # Remove markdown code fences if present
    text = re.sub(r"^```json", "", text)
    text = re.sub(r"^```", "", text)
    text = re.sub(r"```$", "", text)
    text = text.strip()

    try:
        return json.loads(text)

    except Exception:
        return {
            "score": 0,
            "feedback": text,
            "missing_points": "",
            "suggestions": "Unable to parse AI response."
        }
        
def analyze_resume(resume_text: str):
    prompt = f"""
You are an expert technical recruiter.

Analyze the following resume.

Resume:

{resume_text}

Return ONLY valid JSON.

{{
    "name": "...",
    "skills": [
        "...",
        "..."
    ],
    "projects": [
        "...",
        "..."
    ],
    "technologies": [
        "...",
        "..."
    ],
    "strengths": [
        "...",
        "..."
    ],
    "recommended_role": "...",
    "experience_level": "Beginner"
}}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    text = re.sub(r"^```json", "", text)
    text = re.sub(r"^```", "", text)
    text = re.sub(r"```$", "", text)
    text = text.strip()

    try:
        return json.loads(text)

    except Exception as e:
        logger.error(f"AI Evaluation Error: {e}")

        return {
            "score": 0,
            "feedback": "AI evaluation unavailable.",
            "missing_points": "",
            "suggestions": "Please try again later."
            }