from typing import Dict

LEVELS = ["бастауыш", "орташа", "жоғары"]

def infer_level(score: float) -> str:
    if score < 40:
        return LEVELS[0]
    if score < 75:
        return LEVELS[1]
    return LEVELS[2]
