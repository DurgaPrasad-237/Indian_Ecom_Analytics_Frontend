export interface ChatHistoryEntry {
  role: 'user' | 'assistant';
  content: string;
}

export interface AnalyticsChatRequest {
  question: string;
  chat_history: ChatHistoryEntry[];
}

export interface AnalyticsChatResponse {
  answer: string;
  insights?: string | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  insights?: string | null;
  status?: 'sending' | 'sent' | 'error';
}
