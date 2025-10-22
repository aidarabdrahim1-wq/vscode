from typing import List

class QuestionGenerator:
    def generate(self, subject: str, level: str, num: int) -> List[dict]:
        return [
            {
                "id": f"q{i+1}",
                "question": f"{subject} ({level}) сұрағы {i+1}",
                "options": ["A", "B", "C", "D"],
                "correct_index": i % 4,
            }
            for i in range(num)
        ]
