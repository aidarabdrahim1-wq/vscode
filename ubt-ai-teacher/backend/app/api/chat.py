import os
from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List, Literal, Optional
from typing import Any

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
    api_key = os.getenv("OPENAI_API_KEY")
    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    if not api_key:
        # Fallback: simple echo-style behavior when no key configured
        last_user = next((m for m in reversed(req.messages) if m.role == "user"), None)
        reply = (
            "Сәлем! Мен ҰБТ-ға дайындайтын AI мұғаліммін."
            if not last_user
            else f"Түсіндірейін: {last_user.content}"
        )
        return ChatResponse(reply=reply)

    try:
        # Lazy import to avoid dependency when not configured
        from openai import OpenAI  # type: ignore

        client = OpenAI(api_key=api_key)
        messages: List[dict[str, Any]] = [
            {"role": m.role, "content": m.content} for m in req.messages
        ]
        # System primer to ensure tutor persona
        system_preamble = (
            "Сен жылы, түсінікті, сабырлы ҰБТ мұғалімісің. Қазақша жауап бер."
            " Деңгейге бейімделіп, мысалдармен түсіндір."
        )
        if not any(m.get("role") == "system" for m in messages):
            messages.insert(0, {"role": "system", "content": system_preamble})

        completion = client.chat.completions.create(
            model=model,
            messages=messages,  # type: ignore[arg-type]
            temperature=0.2,
        )
        reply = completion.choices[0].message.content or "Кешіріңіз, жауап табылмады."
        return ChatResponse(reply=reply)
    except Exception as e:  # defensive: keep service alive on API error
        last_user = next((m for m in reversed(req.messages) if m.role == "user"), None)
        fallback = (
            "(OpenAI қатесі) \n"
            + (
                f"Түсіндірейін: {last_user.content}"
                if last_user
                else "Сәлем! Мен ҰБТ-ға дайындайтын AI мұғаліммін."
            )
        )
        return ChatResponse(reply=fallback)
