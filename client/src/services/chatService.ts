import { ChatHistoryResponse } from '@/types/chat';
import api from './apiClient';

export const chatService = {
  getChatHistory: async () => {
    const response = await api.get<ChatHistoryResponse>('/chat/history');
    return response.data?.chatHistory ?? [];
  },

  sendPrompt: async (prompt: string) => {
    return await api.post('/chat/prompt', { prompt });
  },
};
