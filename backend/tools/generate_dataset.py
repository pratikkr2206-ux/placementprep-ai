import json
import os


def save_questions(folder, filename, questions):
    os.makedirs(folder, exist_ok=True)

    path = os.path.join(folder, filename)

    with open(path, "w", encoding="utf-8") as file:
        json.dump(
            questions,
            file,
            indent=4,
            ensure_ascii=False
        )

    print(f"Saved {len(questions)} questions -> {path}")


java_beginner = [
    {
        "question": "What is Java?",
        "answer": "Java is a high-level, object-oriented programming language developed by Sun Microsystems.",
        "category": "Java Basics",
        "role": "Java Developer",
        "difficulty": "Beginner"
    },
    {
        "question": "What are JVM, JRE and JDK?",
        "answer": "JVM executes Java bytecode, JRE provides runtime environment and JDK contains development tools.",
        "category": "Java Basics",
        "role": "Java Developer",
        "difficulty": "Beginner"
    },

    # More questions will be added here
]


save_questions(
    "app/data/java",
    "beginner.json",
    java_beginner
)