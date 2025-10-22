# UBT AI Teacher Backend

## Run locally

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

- Health: GET http://localhost:8000/health
- Chat: POST http://localhost:8000/api/chat
- Student: GET/POST http://localhost:8000/api/student
- Tests: POST http://localhost:8000/api/tests/generate, /evaluate
- Analytics: GET/POST http://localhost:8000/api/analytics/{student_id}
