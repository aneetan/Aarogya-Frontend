import { useState } from "react"
import ChatMessage from "./ChatMessage";

const ChatWindow = () => {
   const [messages, setMessages] = useState([
       { text: "Hello! Ask me any first aid question.", isUser: false }
   ]) 
   const [input, setInput] = useState("");
   const [loading, setLoading] = useState(false);

   const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isUser: true }]);
    setLoading(true);

    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();

    setMessages([...messages, { text: input, isUser: true }, { text: data.response, isUser: false }]);
    setInput("");
    setLoading(false);
  };
  return (
     <div className="flex flex-col h-96 w-full max-w-md mx-auto border border-gray-300 rounded-lg shadow-sm bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
         {messages.map((m, i) => (
            <ChatMessage key={i} message={m.text} isUser={m.isUser} />
         ))}
      </div>
      <div className="border-t border-gray-200 p-3">
         <div className="flex space-x-2">
            <input
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            disabled={loading}
            placeholder="Type your message..."
            />
            <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            onClick={sendMessage} 
            disabled={loading}
            >
            {loading ? 'Sending...' : 'Send'}
            </button>
         </div>
      </div>
      </div>
  )
}

export default ChatWindow
