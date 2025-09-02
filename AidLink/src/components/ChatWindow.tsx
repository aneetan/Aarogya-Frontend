import { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaTimes } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import ChatMessage from "./chat/ChatMessage";
import type { ApiError, ChatResponse } from "../types/chat.types";
import { getChatResponse } from "../api/chat.api";
import Logo from "./Logo";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your First Aid Assistant. Ask me any medical question.", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation<ChatResponse, ApiError, string>({
    mutationFn: getChatResponse,
    onMutate: (userMessage) => {
      // Optimistically add user message
      setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
      return { userMessage };
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

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="absolute right-6 top-4 z-10">
        <button 
          onClick={() => navigate('/')}
          className="p-1 cursor-pointer rounded-full hover:text-[#be1724] transition-colors"
        >
          <FaTimes className="w-5 h-5"/>
        </button>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header with Logo */}
        <div className="p-4 flex justify-center border-b border-gray-200 bg-white">
          <div className="w-16">
            <Logo isName={false} />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message.text} 
              isUser={message.isUser} 
            />
          ))}
          
          {/* Show loading indicator when mutation is pending */}
          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs md:max-w-md">
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
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          {/* Suggestions */}
          <div className="mb-3 flex flex-wrap gap-2">
            {["How to treat a burn?", "Someone is fainted", "Help with bleeding wound", "CPR steps"].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={chatMutation.isPending}
                className="px-3 py-1.5 text-xs sm:text-sm bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          <div className="relative rounded-2xl border border-gray-200 bg-white shadow-md">
            <div className="flex items-center p-3">
              <input
                placeholder="Describe your medical concern or ask for help..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={chatMutation.isPending}
                className="flex-1 border-none bg-transparent focus:outline-none text-sm sm:text-base placeholder-gray-400 disabled:bg-transparent disabled:cursor-not-allowed"
              />
              
              <div className="flex space-x-2 ml-2">
                {/* Voice control */}
                <button
                  onClick={toggleVoiceControl}
                  disabled={chatMutation.isPending}
                  className={`h-8 w-8 p-0 flex items-center justify-center rounded-full transition-colors ${
                    isListening 
                      ? 'bg-[#be1724] text-white' 
                      : 'text-gray-500 hover:text-[#be1724] hover:bg-gray-100'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <FaMicrophone className="h-4 w-4" />
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || chatMutation.isPending}
                  className="h-8 w-8 p-0 bg-[#be1724] text-white flex items-center justify-center rounded-full hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoIosSend className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Show error message if needed */}
          {chatMutation.isError && (
            <div className="mt-2 text-red-500 text-sm text-center">
              {chatMutation.error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}