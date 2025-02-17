const ChatArea = () => {
  return (
    <div className="chat-area">
      <label className="main-title">Jawuan's GPT</label>
      
      <label className="greeting">Good Afternoon, User</label>
      <div className="input-container">
        <input 
          type="text"
          placeholder="What can I help you with?"
          className="chat-input"
        />
      </div>
    </div>
  )
}

export default ChatArea
