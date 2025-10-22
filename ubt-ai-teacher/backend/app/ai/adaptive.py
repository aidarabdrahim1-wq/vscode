from typing import List, Dict

class AdaptiveEngine:
    def determine_level(self, past_scores: List[float]) -> str:
        if not past_scores:
            return "орташа"
        avg = sum(past_scores) / len(past_scores)
        if avg >= 80:
            return "жоғары"
        if avg <= 50:
            return "бастапқы"
        return "орташа"

    def personalize_example(self, interest_tags: List[str]) -> str:
        if not interest_tags:
            return "күнделікті өмірден"
        return interest_tags[0]
