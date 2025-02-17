import { useState } from 'react';
import SideBar from './components/SideBar';
import ChatArea from './components/ChatArea';
import './App.css';

const App = () => {
  const [chats] = useState([
    { id: 1, title: 'Chat 1' },
    { id: 2, title: 'Chat 2' },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app">
      <div className={`sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
        <SideBar chats={chats} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div className="chat-area">
        <ChatArea
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </div>
  );
};

export default App;
