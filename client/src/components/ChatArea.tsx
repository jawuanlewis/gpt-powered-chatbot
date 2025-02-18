import { Dispatch, SetStateAction } from 'react';
import MenuButton from './MenuButton';
import '@/styles/ChatArea.css';

interface ChatAreaProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const ChatArea = ({ isSidebarOpen, setIsSidebarOpen }: ChatAreaProps) => {
  return (
    <>
      <div className="chat-area-head">
        {!isSidebarOpen && (
          <MenuButton onClick={() => setIsSidebarOpen(true)} />
        )}
        <label className="main-title">Jawuan's GPT</label>
      </div>

      <label className="greeting">Good afternoon, User</label>
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
