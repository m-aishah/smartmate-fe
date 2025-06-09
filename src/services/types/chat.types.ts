
export interface Chat {
  id: number;
  title: string;
  description?: string | null;
  coverImage?: string | null;
  isFavourite: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id?: string; // Make ID optional since backend doesn't provide it
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string; // Make timestamp optional since backend doesn't provide it
  subject?: string;
}

export interface ChatWithMessages extends Chat {
  messages: ChatMessage[];
  systemPromptId?: number;
}

// Backend response wrapper
export interface ChatDetailResponse {
  chat: ChatWithMessages;
}

export interface CreateChatRequest {
  title: string;
  initialMessage?: string;
}

export interface SystemPrompt {
  id: string;
  content: string;
  version: string;
  createdAt: string;
}

// Response type for the chats endpoint
export interface ChatsResponse {
  chats: Chat[];
}
