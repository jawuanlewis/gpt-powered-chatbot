import { useState } from 'react';
import SideBar from './components/SideBar';
import ChatArea from './components/ChatArea';
import './styles/App.css';

const App = () => {
  const [chats] = useState([
    {
      id: 1,
      title: 'Chat 1',
      messages: [
        { id: 1, role: 'user', content: 'Hello' },
        { id: 2, role: 'assistant', content: 'Hello! How can I help you?' },
        { id: 3, role: 'user', content: 'What is the capital of Arizona?' },
        {
          id: 4,
          role: 'assistant',
          content: 'The capital of Arizona is Phoenix.',
        },
      ],
    },
    {
      id: 2,
      title: 'Chat 2',
      messages: [
        { id: 1, role: 'user', content: 'Wassup' },
        {
          id: 2,
          role: 'assistant',
          content: 'Wassup! Do you have any questions for me?',
        },
        { id: 3, role: 'user', content: 'What is the US population?' },
        {
          id: 4,
          role: 'assistant',
          content: 'The population of the United States is about 340 million.',
        },
        {
          id: 5,
          role: 'user',
          content: 'Cool, what is the Antarctica population?',
        },
        {
          id: 6,
          role: 'assistant',
          content:
            'Nice one! Antarctica has no permanent human population, but the population fluctuates seasonally with researchers and scientists, reaching around 5,000 people during the summer months and dropping to approximately 1,000 during winter.',
        },
      ],
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <div className="app">
      <div className={`sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
        <SideBar chats={chats} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className="chat-area">
        <ChatArea
          currentChat={chats[1].messages}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </div>
  );
};

export default App;
