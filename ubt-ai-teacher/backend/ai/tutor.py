from typing import Dict, List

class Tutor:
    def generate_explanation(self, topic: str, interests: List[str]) -> str:
        if "футбол" in interests:
            return f"{topic} тақырыбын футбол мысалымен түсіндірейік..."
        if "музыка" in interests:
            return f"{topic} тақырыбын музыка арқылы түсіндірейік..."
        return f"{topic} туралы қарапайым түсініктеме."
