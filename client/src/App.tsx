import { useState, useEffect } from 'react';
import { chatService } from '@/services/chatService';
import { Chat } from '@/types/chat';
import SideBar from '@/components/SideBar';
import ChatArea from '@/components/ChatArea';
import '@/styles/App.css';

const App = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const initializeChats = async () => {
      const chatHistory = await getChats();
      setChats(chatHistory);
    };
    void initializeChats();
  }, []);

  useEffect(() => {
    if (chats.length > 0 && !activeChat) {
      setActiveChat(chats[0]);
    }
  }, [chats, activeChat]);

  const getChats = async () => {
    try {
      return await chatService.getChatHistory();
    } catch (error) {
      console.error('(Client) Error calling getChatHistory() API:', error);
    }
  };

  return (
    <div className="app">
      <div className={`sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
        <SideBar chats={chats} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className="chat-area">
        <ChatArea
          currentChat={activeChat?.messages ?? null}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </div>
  );
};

export default App;
