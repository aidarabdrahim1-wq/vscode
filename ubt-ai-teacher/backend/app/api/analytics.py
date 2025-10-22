from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, List

router = APIRouter()

PROGRESS: Dict[str, Dict[str, Dict]] = {}

class ProgressRecord(BaseModel):
    student_id: str
    subject: str
    total_tests: int = 0
    avg_score: float = 0.0
    streak_days: int = 0


@router.get("/{student_id}", response_model=List[ProgressRecord])
async def get_progress(student_id: str):
    student_progress = PROGRESS.get(student_id, {})
    return [ProgressRecord(**rec) for rec in student_progress.values()]


class UpdateProgressRequest(BaseModel):
    subject: str
    score_percent: float


@router.post("/{student_id}", response_model=ProgressRecord)
async def update_progress(student_id: str, req: UpdateProgressRequest):
    per_student = PROGRESS.setdefault(student_id, {})
    current = per_student.get(req.subject)
    if not current:
        current = {
            "student_id": student_id,
            "subject": req.subject,
            "total_tests": 0,
            "avg_score": 0.0,
            "streak_days": 1,
        }
    new_total = current["total_tests"] + 1
    new_avg = (
        (current["avg_score"] * current["total_tests"]) + req.score_percent
    ) / new_total
    current.update({"total_tests": new_total, "avg_score": new_avg})
    per_student[req.subject] = current
    return ProgressRecord(**current)
