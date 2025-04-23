import { useState, useEffect } from 'react';
import { chatService } from '@/services/chatService';
import { Chat } from '@/types/chat';
import SideBar from '@/components/SideBar';
import ChatArea from '@/components/ChatArea';
import '@/styles/App.css';

const App = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    void getChats();
  }, []);

  const getChats = async () => {
    try {
      const chatHistory = await chatService.getChatHistory();
      setChats(chatHistory);
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
        {chats.length > 0 ? (
          <ChatArea
            currentChat={chats[0].messages}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;
