import { useState } from 'react';
import '@/styles/Conversation.css';

interface Message {
  id: number;
  role: string;
  content: string;
}

const Conversation = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'user', content: 'Hello' },
    { id: 2, role: 'assistant', content: 'Hello! How can I help you?' },
    { id: 3, role: 'user', content: 'What is the capital of Arizona?' },
    { id: 4, role: 'assistant', content: 'The capital of Arizona is Phoenix.' },
  ]);

  return (
    <div className="conversation-box">
      <ul>
        {messages.map((message) => (
          <li key={message.id} className={`${message.role}-message`}>
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversation;
