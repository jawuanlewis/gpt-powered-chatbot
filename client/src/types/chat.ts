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

export type CurrChat = {
  id: number;
  title: string;
  messages: Message[];
} | null;
