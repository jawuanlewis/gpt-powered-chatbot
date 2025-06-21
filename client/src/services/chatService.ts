import { CurrChat } from '@/types/chat';
import api from './apiClient';

export const chatService = {
  getChatHistory: async () => {
    const response = await api.get('/chat/history');
    return response.data?.chatHistory ?? [];
  },

  handlePrompt: async (chat: CurrChat, prompt: string) => {
    const response = await api.post('/chat/prompt', { chat, prompt });
    return response.data?.chat ?? chat;
  },

  updateChatTitle: async (chatId: string, newTitle: string) => {
    const response = await api.patch('/chat/title', {
      chatId: chatId,
      title: newTitle,
    });
    return response.data?.chat;
  },
};
