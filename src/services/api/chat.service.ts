
import { apiClient } from '@/lib/api-client';
import { chats } from '@/constants/endpoints';
import { Chat, ChatWithMessages, CreateChatRequest, SystemPrompt, ChatsResponse, ChatDetailResponse } from '../types/chat.types';

interface SendMessageRequest {
  chatId?: number;
  chatTitle?: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  systemPromptId?: number;
  attachments?: string[];
  documentURL?: string | null;
  selectedSummary?: string | null;
}

interface SendMessageResponse {
  id: number;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  aiReply: {
    id: string;
    role: 'assistant';
    content: string;
    timestamp: string;
  };
}

class ChatService {
  async getAllChats(): Promise<Chat[]> {
    const response = await apiClient.get<ChatsResponse>(chats.getAll());
    return response.data.chats;
  }

  async getChatById(id: string): Promise<ChatWithMessages> {
    const response = await apiClient.get<ChatDetailResponse>(chats.getById(id));
    return response.data.chat; // Extract the nested chat object
  }

  async createChat(data: CreateChatRequest): Promise<Chat> {
    const response = await apiClient.post<Chat>(chats.create(), data);
    return response.data;
  }

  async sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
    console.log('Sending message to backend:', data);
    const response = await apiClient.post<SendMessageResponse>(chats.create(), data);
    return response.data;
  }

  async getSystemPrompt(id: string): Promise<SystemPrompt> {
    const response = await apiClient.get<SystemPrompt>(chats.getSystemPrompt(id));
    return response.data;
  }
}

export const chatService = new ChatService();
