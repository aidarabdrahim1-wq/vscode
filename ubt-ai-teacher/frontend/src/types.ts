export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  role: MessageRole;
  content: string;
}

export interface ChatRequest {
  student_id?: string;
  messages: Message[];
}

export interface ChatResponse {
  reply: string;
}

export interface StudentProfile {
  student_id: string;
  name: string;
  level?: string;
  interests: string[];
  learning_style?: string | null;
  weak_topics: string[];
  strong_topics: string[];
  preferred_language: string;
}
