import { Dispatch, SetStateAction } from 'react';
import MenuButton from './MenuButton';

interface Chat {
  id: number;
  title: string;
}

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
