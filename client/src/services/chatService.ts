import api from './apiClient';

export const chatService = {
  getChatHistory: async () => {
    const response = await api.get('/chat/history');
    return response.data?.chatHistory ?? [];
  },

  handlePrompt: async (prompt: string) => {
    return await api.post('/chat/prompt', { prompt });
  },
};
