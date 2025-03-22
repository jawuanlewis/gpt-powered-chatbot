import '@/styles/Conversation.css';

interface Message {
  id: number;
  role: string;
  content: string;
}

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
