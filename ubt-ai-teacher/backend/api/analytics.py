from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Progress(BaseModel):
    student_id: str
    completed: int
    correct: int

@router.post("/progress")
def report_progress(p: Progress) -> dict:
    accuracy = (p.correct / p.completed) * 100 if p.completed else 0.0
    return {"student_id": p.student_id, "accuracy": accuracy}
