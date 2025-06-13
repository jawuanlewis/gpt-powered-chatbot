import { Message } from '@/types/chat';
import '@/styles/Conversation.css';

interface ConversationProps {
  chat: Message[];
}

const Conversation = ({ chat }: ConversationProps) => {
  return (
    <div className="conversation-box">
      <ul>
        {chat.map((message) => (
          <li key={message.id} className={`${message.role}-message`}>
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversation;
