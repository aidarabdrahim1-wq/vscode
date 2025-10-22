from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Question(BaseModel):
    id: str
    prompt: str
    options: List[str]
    answer_index: int

class TestResponse(BaseModel):
    questions: List[Question]

@router.get("/starter", response_model=TestResponse)
def starter_test() -> TestResponse:
    # Minimal seed questions
    questions = [
        Question(
            id="math-q1",
            prompt="2 + 2 = ?",
            options=["3", "4", "5", "6"],
            answer_index=1,
        ),
        Question(
            id="kaz-q1",
            prompt="'Мектеп' сөзінің синонимі?",
            options=["оқу орны", "үй", "аурухана", "ойын"] ,
            answer_index=0,
        ),
    ]
    return TestResponse(questions=questions)
