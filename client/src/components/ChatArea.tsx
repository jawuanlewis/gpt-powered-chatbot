import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Chat } from '@/types/chat';
import MenuButton from './MenuButton';
import Conversation from './Conversation';
import '@/styles/ChatArea.css';

interface ChatAreaProps {
  currentChat: Chat | null;
  setCurrentChat: Dispatch<SetStateAction<Chat | null>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const ChatArea = ({
  currentChat,
  setCurrentChat,
  isSidebarOpen,
  setIsSidebarOpen,
}: ChatAreaProps) => {
  const [timeOfDay, setTimeOfDay] = useState<string>('');

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setTimeOfDay('morning');
      } else if (currentHour >= 12 && currentHour < 17) {
        setTimeOfDay('afternoon');
      } else {
        setTimeOfDay('evening');
      }
    };
    updateGreeting();

    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="chat-area-head">
        {!isSidebarOpen && (
          <MenuButton onClick={() => setIsSidebarOpen(true)} />
        )}
        <label className="main-title">Jawuan&apos;s GPT</label>
      </div>

      {currentChat ? (
        <Conversation chat={currentChat.messages} />
      ) : (
        <label className="greeting">Good {timeOfDay}, User</label>
      )}
      <div className="input-container">
        <input
          type="text"
          placeholder="What can I help you with?"
          className="chat-input"
        />
      </div>
    </>
  );
};

export default ChatArea;
