import { useState } from "react";
import ChatInterface from "../components/chat/layout/ChatInterface"
import ChatSidebar from "../components/chat/layout/ChatSidebar"

const ChatPage = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gradient-medical overflow-hidden">
      <div className={`
        fixed lg:relative z-30 h-screen
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <ChatSidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Overlay for small screens when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <main className="flex-1 min-w-0 relative">
        <ChatInterface />
      </main>
    </div>
  )
}

export default ChatPage
