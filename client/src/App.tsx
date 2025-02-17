import { useState } from 'react'
import SideBar from './components/SideBar'
import ChatArea from './components/ChatArea'
import './App.css'

const App = () => {
  const [chats] = useState([
    { id: 1, title: 'Chat 1' },
    { id: 2, title: 'Chat 2' },
  ])

  return (
    <div className="app">
      <SideBar chats={chats} />
      <ChatArea />
    </div>
  )
}

export default App
