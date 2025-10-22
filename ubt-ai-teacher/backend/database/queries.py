from typing import Dict, Optional
from .models import Student

# In-memory store for demo purposes
_store: Dict[str, Student] = {}

def upsert_student(student: Student) -> Student:
    _store[student.student_id] = student
    return student

def get_student(student_id: str) -> Optional[Student]:
    return _store.get(student_id)
