import { Dispatch, SetStateAction } from 'react';
import { Chat } from '@/types/chat';
import MenuButton from './MenuButton';
import '@/styles/SideBar.css';

interface SideBarProps {
  chats: Chat[];
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ chats, setIsSidebarOpen }: SideBarProps) => {
  return (
    <>
      <MenuButton onClick={() => setIsSidebarOpen(false)} />

      <button className="new-chat-btn">New Chat</button>

      <div className="recent-chats">
        <label className="recent-chats-title">Recent Chats</label>
        <ul className="chat-list">
          {chats.map((chat) => (
            <li key={chat.id} className="chat-item">
              {chat.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
