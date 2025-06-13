import { Dispatch, SetStateAction } from 'react';
import { Chat, CurrChat } from '@/types/chat';
import MenuButton from './MenuButton';
import ChatItem from './ChatItem';
import '@/styles/SideBar.css';

interface SideBarProps {
  chats: Chat[];
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  currentChat: CurrChat;
  setCurrentChat: Dispatch<SetStateAction<CurrChat>>;
  onUpdateChatTitle?: (chatId: string, newTitle: string) => void;
}

const SideBar = ({
  chats,
  setIsSidebarOpen,
  currentChat,
  setCurrentChat,
  onUpdateChatTitle,
}: SideBarProps) => {
  return (
    <>
      <MenuButton onClick={() => setIsSidebarOpen(false)} />

      <button className="new-chat-btn" onClick={() => setCurrentChat(null)}>
        New Chat
      </button>

      <div className="recent-chats">
        <label className="recent-chats-title">Recent Chats</label>
        <ul className="chat-list">
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={currentChat?.id === chat.id}
              onSelect={setCurrentChat}
              onUpdateTitle={onUpdateChatTitle}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
