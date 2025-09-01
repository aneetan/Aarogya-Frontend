import type { Message } from "../../types/chat.types";

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
          message.sender === 'user'
            ? 'bg-red-600 text-white rounded-br-none'
            : `bg-white text-gray-800 border border-gray-200 rounded-bl-none ${message.isFirstAidStep ? 'shadow-md' : ''}`
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-red-100' : 'text-gray-500'}`}>
          {formatTime(message.timestamp)}
        </p>
        
        {message.isFirstAidStep && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">This is general first aid advice. Always seek professional medical help in emergencies.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;