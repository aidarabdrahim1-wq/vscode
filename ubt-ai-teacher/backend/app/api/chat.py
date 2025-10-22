from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List, Literal, Optional

router = APIRouter()

class Message(BaseModel):
    role: Literal["user", "assistant", "system"] = Field(..., description="Message role")
    content: str

class ChatRequest(BaseModel):
    student_id: Optional[str] = None
    messages: List[Message]

class ChatResponse(BaseModel):
    reply: str


@router.post("/", response_model=ChatResponse)
async def chat(req: ChatRequest):
    # Placeholder logic: echo last user message
    last_user = next((m for m in reversed(req.messages) if m.role == "user"), None)
    reply = "Сәлем! Мен ҰБТ-ға дайындайтын AI мұғаліммін." if not last_user else f"Түсіндірейін: {last_user.content}"
    return ChatResponse(reply=reply)
