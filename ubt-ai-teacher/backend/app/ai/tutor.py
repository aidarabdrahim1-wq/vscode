from typing import List, Literal

MessageRole = Literal["user", "assistant", "system"]

class Tutor:
    def reply(self, messages: List[dict]) -> str:
        last_user = next((m for m in reversed(messages) if m.get("role") == "user"), None)
        if not last_user:
            return "Сәлем! Қалай көмектесе аламын?"
        content = last_user.get("content", "")
        return f"Осыны қарастырайық: {content}"
