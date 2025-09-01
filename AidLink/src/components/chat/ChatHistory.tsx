import type { ChatHistoryProps } from "../../types/chat.types";

interface ChatHistoryArgs {
   history: ChatHistoryProps[];
   onNewChat: () => void;
}

const ChatHistory: React.FC<ChatHistoryArgs> = ({history, onNewChat}) => {   
  return (
   <>
      <div className="p-4">
         <button 
            onClick={onNewChat}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center"
         >
            <span className="mr-2">+</span> New Chat
         </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
         <h2 className="px-2 text-sm font-semibold text-gray-500 mb-2">Recent Conversations</h2>
         
         {history.length > 0 ? (
         <div className="space-y-2">
            {history.map(chat => (
               <div key={chat.id} className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <h3 className="font-medium text-gray-800">{chat.title}</h3>
                  <p className="text-sm text-gray-500">{chat.preview}</p>
                  <p className="text-xs text-gray-400 mt-1">
                  {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
               </div>
            ))}
            </div>
         ) : (
            <div className="p-4 text-center text-gray-500">
            <p>No conversations yet</p>
            <p className="text-sm mt-2">Start chatting to see your history here</p>
            </div>
         )}
      </div>
   </>
  )
}

export default ChatHistory
