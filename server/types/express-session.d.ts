import { Chat } from './chat.ts';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    chats: Chat[];
  }
}
