import { useState } from "react"
import ChatMessage from "./ChatMessage";
import { useMutation } from "@tanstack/react-query";
import type { ApiError, ChatResponse } from "../types/chat.types";
import { getChatResponse } from "../api/chat.api";

const ChatWindow = () => {
   const [messages, setMessages] = useState([
       { text: "Hello! Ask me any first aid question.", isUser: false }
   ]) 
   const [input, setInput] = useState("");

   const chatMutation = useMutation<ChatResponse, ApiError, string>({
      mutationFn: getChatResponse,
      onMutate: (userMessage) => {
         // Optimistically add user message
         setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
         return { userMessage }; // Return context for rollback
      },
       onSuccess: (data) => {
         // Add bot response when successful
         setMessages(prev => [
            ...prev, 
            { text: data.response, isUser: false }
         ]);
      },
      onError: (error) => {
         console.error('Chat mutation error:', error);
         
         // Add error message
         setMessages(prev => [
            ...prev,
            { text: `Error: ${error.message}`, isUser: false }
         ]);
      },
   });

   const sendMessage = async () => {
      if (!input.trim()) return;
      chatMutation.mutate(input.trim());

      setInput("");
   };

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         sendMessage();
      }
   };


  return (
     <div className="flex flex-col h-96 w-full max-w-md mx-auto border border-gray-300 rounded-lg shadow-sm bg-white">
         <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
               <ChatMessage key={i} message={m.text} isUser={m.isUser} />
            ))}
            
            {/* Show loading indicator when mutation is pending */}
            {chatMutation.isPending && (
               <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                     <div className="flex items-center space-x-2">
                        <div className="animate-pulse flex space-x-1">
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-gray-500 text-sm">AidLink is thinking...</span>
                     </div>
                  </div>
               </div>
            )}
         </div>
         
         <div className="border-t border-gray-200 p-3">
            <div className="flex space-x-2">
               <input
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={chatMutation.isPending}
                  placeholder="Type your first aid question..."
               />
               <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                  onClick={sendMessage} 
                  disabled={!input.trim() || chatMutation.isPending}
               >
                  {chatMutation.isPending ? 'Sending...' : 'Send'}
               </button>
            </div>
            
            {/* Show error message if needed */}
            {chatMutation.isError && (
               <div className="mt-2 text-red-500 text-sm">
                  {chatMutation.error.message}
               </div>
            )}
         </div>
      </div>
  )
}

export default ChatWindow
