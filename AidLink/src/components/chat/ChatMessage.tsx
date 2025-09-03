import type { MedicalResponse, MessageProps } from "../../types/chat.types";
import Logo from "../Logo";
import StructuredResponse from "./StructuredResponse";

interface ChatMessageProps {
   messages: MessageProps[];
   isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ messages }) => {
  const isStructuredResponse = (text: string | MedicalResponse): text is MedicalResponse => {
    return typeof text === 'object' && text !== null && 'title' in text && 'steps' in text;
  };

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
            {message.isUser ? (
              <p>{message.text as string}</p>
            ) : (
              isStructuredResponse(message.text) ?(
                <StructuredResponse response={message.text}/>
              ) : (
              <p>{message.text as string}</p>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;