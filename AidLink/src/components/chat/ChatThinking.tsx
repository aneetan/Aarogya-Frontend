const ChatThinking = () => {
  return (
   <div className="flex justify-start">
      <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs md:max-w-md">
         <div className="flex items-center space-x-2">
         <div className="animate-pulse flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
         </div>
         <span className="text-gray-500 text-sm">Thinking...</span>
         </div>
      </div>
   </div>
  )
}

export default ChatThinking
