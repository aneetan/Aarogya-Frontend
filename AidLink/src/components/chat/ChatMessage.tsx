import type { MessageProps } from "../../types/chat.types";
import { FaRobot } from "react-icons/fa";
import Logo from "../Logo";

interface ChatMessageProps {
   messages: MessageProps[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({ messages }) => {
  return (
    <div className="space-y-3">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
        >
          {/* Chatbot Avatar - only show for bot messages */}
          {!message.isUser && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0">
               <Logo isName={false}/>
            </div>
          )}
          
          <div
            className={`relative p-3 rounded-lg max-w-xs md:max-w-md ${
              message.isUser 
                ? 'bg-[#be1724] text-white rounded-br-sm' 
                : 'bg-gray-200 text-gray-800 rounded-bl-sm'
            }`}
          >
            {message.text}
            
            {/* Optional: Add timestamp */}
            <div className={`text-xs mt-1 ${message.isUser ? 'text-white/70 text-right' : 'text-gray-500'}`}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;