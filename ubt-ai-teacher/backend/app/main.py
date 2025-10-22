from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import chat, student, tests, analytics

app = FastAPI(title="UBT AI Teacher API", version="0.1.0")

# CORS (allow local dev frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(student.router, prefix="/api/student", tags=["student"])
app.include_router(tests.router, prefix="/api/tests", tags=["tests"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
