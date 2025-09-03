import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaTimes } from "react-icons/fa";
import Logo from "../../Logo";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { ApiError, ChatResponse, MessageProps } from "../../../types/chat.types";
import { getChatResponse } from "../../../api/chat.api";
import ChatThinking from "../ChatThinking";
import ChatMessage from "../ChatMessage";

export default function ChatInterface() {
  const [messages, setMessages] = useState<MessageProps[]>([
    { text: "Ask me first aid related questions", isUser: false }
  ]); 
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const chatMutation = useMutation<ChatResponse, ApiError, string>({
      mutationFn: getChatResponse,
      onMutate: (userMessage) => {
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setIsAiTyping(true);
        return { userMessage };
      },
      onSuccess: (data) => {
         // Add bot response when successful
         const formatted = data.response;
         setMessages(prev => [
         ...prev, 
         { text: formatted, isUser: false }
         ]);
         setIsAiTyping(false);
      },
      onError: (error) => {
         console.error('Chat mutation error:', error);
         
         // Add error message
         setMessages(prev => [
         ...prev,
         { text: `Sorry, I'm having trouble connecting. Please try again. Error: ${error.message}`, isUser: false }
         ]);
        },
   });
 
    // Auto-scroll to bottom when messages change
   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

  const handleSendMessage = () => {
   if (inputMessage.trim() && !chatMutation.isPending) {
      chatMutation.mutate(inputMessage.trim());
      setInputMessage("");
   }
  };

   const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSendMessage();
      }
   };

  const toggleVoiceControl = () => {
    setIsListening(!isListening);
    // Implement voice recognition logic here
    console.log("Voice control:", !isListening ? "activated" : "deactivated");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <div className="absolute right-6 top-4 z-10">
         <button 
            onClick={() => navigate('/')}
            className="p-1 cursor-pointer rounded-full hover:text-[var(--primary-color)] transition-colors"
         >
            <FaTimes className="w-5 h-5"/>
         </button>
      </div>
      
      {/* Main Chat Area - Simplified structure */}
      <div className="flex flex-col h-full">
        {/* Welcome section - only shown initially */}
        {messages.length <= 1 && (
          <div className="flex flex-col items-center pt-8 pb-4">
            <div className="w-24 mb-4">
              <Logo isName={false} />
            </div>
            <div className="text-center px-4 mb-4">
              <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-gray-800">
                Hi! I'm your First Aid Assistant.
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Ask me anything about first aid and I'll provide real-time guidance
              </p>
            </div>
          </div>
        )}

        {/* Scrollable messages container */}
        <div 
          ref={chatContainerRef} 
          className="flex-1 overflow-y-auto px-4 pb-2 mt-18"
        >
          <div className="max-w-2xl mx-auto">
            <ChatMessage 
              messages={messages} 
              isTyping={isAiTyping}
            />
            
            {chatMutation.isPending && (
              <ChatThinking/>
            )}
          
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fixed input area at bottom */}
        <div className="w-full max-w-2xl mx-auto pb-4 px-4 mt-auto">
          <div className="relative rounded-2xl border border-gray-200 bg-white shadow-md">
            <div className="flex items-center p-3 sm:p-4">
              <input
                placeholder="Describe your medical concern or ask for help..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={chatMutation.isPending || isAiTyping}
                className="flex-1 border-none bg-transparent focus:outline-none text-sm sm:text-base placeholder-gray-400 disabled:opacity-50"
              />
              
              <div className="flex space-x-2 ml-2">
                {/* Voice control */}
                <button
                  onClick={toggleVoiceControl}
                  disabled={chatMutation.isPending || isAiTyping}
                  className={`h-8 w-8 p-0 flex items-center justify-center rounded-full transition-colors ${isListening ? 'bg-[#be1724] text-white' : 'text-gray-500 hover:text-[#be1724] hover:bg-gray-100'} disabled:opacity-50`}
                >
                  <FaMicrophone className="h-4 w-4" />
                </button>
                
                {inputMessage.trim() && (
                  <button
                    onClick={handleSendMessage}
                    disabled={chatMutation.isPending || isAiTyping}
                    className="h-8 w-8 p-0 bg-[var(--primary-color)] text-white flex items-center justify-center rounded-full hover:shadow-md transition-shadow disabled:opacity-50"
                  >
                    <IoIosSend className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Suggestions */}
          {messages.length <= 1 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["How to treat a burn?", "Someone is fainted", "Help with bleeding wound"].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                disabled={chatMutation.isPending || isAiTyping}
                className="px-3 py-1.5 text-xs sm:text-sm bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}