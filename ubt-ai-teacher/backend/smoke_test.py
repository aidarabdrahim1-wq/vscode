import json
import urllib.request

BASE = "http://localhost:8000"


def http(method: str, path: str, data: dict | None = None):
    url = f"{BASE}{path}"
    body = None
    headers = {"Content-Type": "application/json"}
    if data is not None:
        body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, method=method, headers=headers)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main():
    print("health:", http("GET", "/health"))

    student = {
        "student_id": "student-1",
        "name": "Айдын",
        "level": "орташа",
        "interests": ["футбол", "ойын"],
        "learning_style": "визуалды",
        "weak_topics": ["квадрат теңдеулер"],
        "strong_topics": ["алгебра"],
        "preferred_language": "kk",
    }
    print("create student:", http("POST", "/api/student/", student))
    print("get student:", http("GET", "/api/student/student-1"))

    chat_req = {
        "student_id": "student-1",
        "messages": [{"role": "user", "content": "Сәлем! Квадрат теңдеуді қалай шешеміз?"}],
    }
    print("chat:", http("POST", "/api/chat/", chat_req))

    gen_req = {"subject": "math", "level": "орташа", "num_questions": 3}
    gen = http("POST", "/api/tests/generate", gen_req)
    print("generate:", gen)

    answers = {q["id"]: (0 if i % 2 == 0 else 1) for i, q in enumerate(gen["questions"])}
    eval_res = http("POST", "/api/tests/evaluate", {"answers": answers})
    print("evaluate:", eval_res)

    upd = http(
        "POST",
        "/api/analytics/student-1",
        {"subject": "math", "score_percent": eval_res["percent"]},
    )
    print("analytics update:", upd)
    print("analytics get:", http("GET", "/api/analytics/student-1"))


if __name__ == "__main__":
    main()
