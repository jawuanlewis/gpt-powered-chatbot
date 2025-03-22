import api from './apiClient';

export const chatService = {
  getChatHistory: async () => {
    return await api.get('/chat/history');
  },

  sendPrompt: async (prompt: string) => {
    return await api.post('/chat/prompt', { prompt });
  },
};
