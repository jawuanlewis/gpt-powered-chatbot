import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { chatService } from '@/services/chatService';
import { CurrChat } from '@/types/chat';
import MenuButton from './MenuButton';
import Conversation from './Conversation';
import '@/styles/ChatArea.css';

interface ChatAreaProps {
  currentChat: CurrChat;
  setCurrentChat: Dispatch<SetStateAction<CurrChat>>;
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
  const [inputValue, setInputValue] = useState<string>(''); // Stores user's current prompt input

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

  const updateChat = async () => {
    if (!inputValue.trim()) return;

    try {
      if (!currentChat) {
        const newChat = await chatService.handlePrompt(null, inputValue);
        setCurrentChat(newChat);
      } else {
        const updatedChat = await chatService.handlePrompt(
          currentChat,
          inputValue
        );
        setCurrentChat(updatedChat);
      }
      setInputValue('');
    } catch (error) {
      console.error('(Client) Error calling handlePrompt() API:', error);
    }
  };

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
        <label className="greeting">Good {timeOfDay}!</label>
      )}
      <div className="input-container">
        <input
          type="text"
          placeholder="What can I help you with?"
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && updateChat()}
        />
        <button
          className="send-button"
          onClick={() => updateChat()}
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </>
  );
};

export default ChatArea;
