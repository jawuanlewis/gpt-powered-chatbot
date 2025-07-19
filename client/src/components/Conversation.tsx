import { useLayoutEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import '@/styles/Conversation.css';

interface ConversationProps {
  chat: Message[];
}

const Conversation = ({ chat }: ConversationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="conversation-box" ref={containerRef}>
      <ul>
        {chat.map((message) => (
          <li key={message.id} className={`${message.role}-message`}>
            {message.id === 'loading' ? (
              <span className="loading-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            ) : (
              message.content
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversation;
