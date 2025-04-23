export interface Message {
  id: number;
  role: string;
  content: string;
}

export interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

export interface ChatHistoryResponse {
  chatHistory: Chat[];
}
