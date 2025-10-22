from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class StudentProfile(BaseModel):
    student_id: str
    name: str
    level: str
    interests: List[str] = []
    learning_style: str = ""
    weak_topics: List[str] = []
    strong_topics: List[str] = []
    preferred_language: str = "kk"

_db: dict[str, StudentProfile] = {}

@router.post("/", response_model=StudentProfile)
def create_or_update(profile: StudentProfile) -> StudentProfile:
    _db[profile.student_id] = profile
    return profile

@router.get("/{student_id}", response_model=Optional[StudentProfile])
def get_profile(student_id: str) -> Optional[StudentProfile]:
    return _db.get(student_id)
