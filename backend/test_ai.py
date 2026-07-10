from app.services.ai_service import evaluate_answer

result = evaluate_answer(
    question="What is OOP?",
    expected_answer="Object-Oriented Programming is a programming paradigm based on classes and objects.",
    user_answer="OOP is programming using classes and objects.",
)

print(result)