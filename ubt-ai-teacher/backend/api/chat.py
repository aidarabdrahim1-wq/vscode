from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    student_id: str | None = None

class ChatResponse(BaseModel):
    reply: str

@router.post("/", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest) -> ChatResponse:
    # Placeholder: echo message for now
    return ChatResponse(reply=f"Сұрағың: {req.message}")
