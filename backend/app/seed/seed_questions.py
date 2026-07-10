import json
from pathlib import Path

from app.database.database import SessionLocal
from app.models.question import Question


def seed_questions():
    db = SessionLocal()

    data_folder = Path(__file__).parent.parent / "data"

    json_files = list(data_folder.glob("*.json"))

    inserted = 0
    skipped = 0

    for json_file in json_files:

        print(f"Reading {json_file.name}...")

        try:
            with open(json_file, "r", encoding="utf-8") as file:
                questions = json.load(file)
        except json.JSONDecodeError:
            print(f"Skipping invalid JSON file: {json_file.name}")
            continue

        for item in questions:

            existing = (
                db.query(Question)
                .filter(
                    Question.question == item["question"],
                    Question.role == item["role"],
                    Question.difficulty == item["difficulty"],
                )
                .first()
            )

            if existing:
                skipped += 1
                continue

            db.add(
                Question(
                    question=item["question"],
                    answer=item["answer"],
                    category=item["category"],
                    role=item["role"],
                    difficulty=item["difficulty"],
                )
            )

            inserted += 1

    db.commit()
    db.close()

    print("\n" + "=" * 45)
    print(f"Questions Inserted : {inserted}")
    print(f"Questions Skipped : {skipped}")
    print("=" * 45)


if __name__ == "__main__":
    seed_questions()