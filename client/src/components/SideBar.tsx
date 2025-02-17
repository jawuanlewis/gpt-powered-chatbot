interface Chat {
  id: number
  title: string
}

interface SidebarProps {
  chats: Chat[]
}

const SideBar = ({ chats }: SidebarProps) => {
  return (
    <div className="sidebar">
      <button className="new-chat-btn">
        New Chat
      </button>
      
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
    </div>
  )
}

export default SideBar
