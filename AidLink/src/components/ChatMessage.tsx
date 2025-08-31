interface ChatMessageProps {
   message: string;
   isUser: boolean;
}
const ChatMessage:React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
   <div className={`p-3 rounded-lg max-w-xs md:max-w-md
   ${isUser ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-gray-800 mr-auto'}`}>
      {message}
   </div>
  )
}

export default ChatMessage
