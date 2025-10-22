from typing import List, Dict

class QuestionGenerator:
    def generate(self, topic: str, level: str) -> List[Dict]:
        if topic == "математика":
            return [
                {"id": "m1", "prompt": "2+3=?", "options": ["4","5","6"], "answer_index": 1}
            ]
        return [
            {"id": "g1", "prompt": f"{topic} бойынша сұрақ", "options": ["A","B","C"], "answer_index": 0}
        ]
