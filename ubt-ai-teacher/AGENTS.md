# Agents Usage Guide

## Purpose
This document describes how the AI agent should behave as an adaptive UBT tutor.

## Capabilities
- Generate level-appropriate questions
- Provide step-by-step explanations
- Track progress and give advice
- Personalize examples to student interests

## API Contracts
- Backend: FastAPI under `/api/*`
- Frontend: React (Vite) calling backend via `VITE_API_BASE_URL`

## Development
- Run backend: `uvicorn app.main:app --reload --port 8000`
- Run frontend: `npm run dev` in `frontend`
