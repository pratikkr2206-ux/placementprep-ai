from pathlib import Path
from pypdf import PdfReader


UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)


def save_resume(file):
    """
    Save uploaded resume and return file path.
    """

    file_path = UPLOAD_FOLDER / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return file_path


def extract_resume_text(file_path):
    """
    Extract all text from a PDF resume.
    """

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text