from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Dict

router = APIRouter()

# In-memory store for demo
STUDENTS: Dict[str, dict] = {}

class StudentProfile(BaseModel):
    student_id: str = Field(..., description="Unique student id")
    name: str
    level: Optional[str] = "орташа"
    interests: List[str] = Field(default_factory=list)
    learning_style: Optional[str] = None
    weak_topics: List[str] = Field(default_factory=list)
    strong_topics: List[str] = Field(default_factory=list)
    preferred_language: str = "kk"


@router.get("/{student_id}", response_model=StudentProfile)
async def get_student(student_id: str):
    if student_id not in STUDENTS:
        raise HTTPException(status_code=404, detail="Student not found")
    return StudentProfile(**STUDENTS[student_id])


@router.post("/", response_model=StudentProfile)
async def upsert_student(profile: StudentProfile):
    STUDENTS[profile.student_id] = profile.dict()
    return profile
