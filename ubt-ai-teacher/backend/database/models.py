from pydantic import BaseModel
from typing import List

class Student(BaseModel):
    student_id: str
    name: str
    level: str
    interests: List[str] = []
    learning_style: str = ""
    weak_topics: List[str] = []
    strong_topics: List[str] = []
    preferred_language: str = "kk"
