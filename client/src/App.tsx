import { useState, useEffect } from 'react';
import { chatService } from '@/services/chatService';
import { Chat, CurrChat } from '@/types/chat';
import SideBar from '@/components/SideBar';
import ChatArea from '@/components/ChatArea';
import '@/styles/App.css';

const App = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<CurrChat>(() => {
    const savedChat = sessionStorage.getItem('ACTIVE_CHAT');
    return savedChat ? JSON.parse(savedChat) : null;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const initializeChats = async () => {
      const chatHistory = await getChats();
      setChats(chatHistory);
    };
    void initializeChats();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('ACTIVE_CHAT', JSON.stringify(activeChat));
  }, [activeChat]);

  const getChats = async () => {
    try {
      return await chatService.getChatHistory();
    } catch (error) {
      console.error('(Client) Error calling getChatHistory() API:', error);
    }
  };

  const handleUpdateChatTitle = async (chatId: string, newTitle: string) => {
    try {
      await chatService.updateChatTitle(chatId, newTitle);
      setChats(
        chats.map((chat) =>
          chat.id === chatId ? { ...chat, title: newTitle } : chat
        )
      );
      if (activeChat?.id === chatId) {
        setActiveChat({ ...activeChat, title: newTitle });
      }
    } catch (error) {
      console.error('(Client) Error updating chat title:', error);
    }
  };

  return (
    <div className="app">
      <div className={`sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
        <SideBar
          chats={chats}
          setIsSidebarOpen={setIsSidebarOpen}
          currentChat={activeChat}
          setCurrentChat={setActiveChat}
          onUpdateChatTitle={handleUpdateChatTitle}
        />
      </div>
      <div className="chat-area">
        <ChatArea
          currentChat={activeChat}
          setCurrentChat={setActiveChat}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </div>
  );
};

export default App;
