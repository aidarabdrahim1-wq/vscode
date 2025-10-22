import type { ChatResponse, Message, StudentProfile } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function chat(messages: Message[], studentId?: string): Promise<ChatResponse> {
  return http<ChatResponse>(`${API_BASE_URL}/api/chat/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_id: studentId, messages }),
  });
}

export async function getStudent(studentId: string): Promise<StudentProfile> {
  return http<StudentProfile>(`${API_BASE_URL}/api/student/${encodeURIComponent(studentId)}`);
}

export async function saveStudent(profile: StudentProfile): Promise<StudentProfile> {
  return http<StudentProfile>(`${API_BASE_URL}/api/student/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
}
