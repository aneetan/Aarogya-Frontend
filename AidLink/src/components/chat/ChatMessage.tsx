import { TypeAnimation } from "react-type-animation";
import type { MessageProps } from "../../types/chat.types";
import Logo from "../Logo";

interface ChatMessageProps {
   messages: MessageProps[];
   isTyping?: boolean;
   onTypingComplete?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ messages, onTypingComplete }) => {

  return (
    <div className="space-y-3 ">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
        >
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
            {!message.isUser? (
                <TypeAnimation
                  sequence={[
                    message.text,
                    () => {
                      if (onTypingComplete) {
                        onTypingComplete();
                      }
                    }
                  ]}
                  wrapper="span"
                  speed={80}
                  style={{ fontSize: '1em', display: 'inline-block' }}
                  repeat={0}
                  cursor={false}
                />
              ) : (
                message.text
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;