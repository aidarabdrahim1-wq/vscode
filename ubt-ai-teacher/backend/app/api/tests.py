from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List, Dict, Optional

router = APIRouter()

class GenerateTestRequest(BaseModel):
    subject: str = Field(..., description="Subject name (e.g., math)")
    level: str = "орташа"
    num_questions: int = 5

class TestQuestion(BaseModel):
    id: str
    question: str
    options: List[str]
    correct_index: Optional[int] = None

class GenerateTestResponse(BaseModel):
    questions: List[TestQuestion]

class EvaluateRequest(BaseModel):
    answers: Dict[str, int]

class EvaluateResponse(BaseModel):
    total: int
    correct: int
    percent: float


@router.post("/generate", response_model=GenerateTestResponse)
async def generate(req: GenerateTestRequest):
    questions = [
        TestQuestion(
            id=f"q{i+1}",
            question=f"{req.subject} сұрағы {i+1}",
            options=["A", "B", "C", "D"],
            correct_index=i % 4,
        )
        for i in range(req.num_questions)
    ]
    return GenerateTestResponse(questions=questions)


@router.post("/evaluate", response_model=EvaluateResponse)
async def evaluate(req: EvaluateRequest):
    total = len(req.answers)
    correct = sum(1 for _qid, choice in req.answers.items() if choice == 0)
    percent = (correct / total * 100.0) if total else 0.0
    return EvaluateResponse(total=total, correct=correct, percent=percent)
