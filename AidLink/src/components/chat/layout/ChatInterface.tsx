import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import Logo from "../../Logo";
import { IoIosSend } from "react-icons/io";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  const toggleVoiceControl = () => {
    setIsListening(!isListening);
    // Implement voice recognition logic here
    console.log("Voice control:", !isListening ? "activated" : "deactivated");
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Assistant Avatar */}
        <div className="sm:mb-4 w-24">
           <Logo isName={false} />
        </div>

        {/* Welcome Message */}
        <div className="mb-12 text-center px-4">
          <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-gray-800">
            Hi! I'm your First Aid Assistant.
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Ask me anything about first aid and I'll provide real-time guidance
          </p>
        </div>

        {/* Input Area */}
        <div className="w-full max-w-2xl px-4">
          <div className="relative rounded-2xl border border-gray-200 bg-white shadow-md">
            <div className="flex items-center p-3 sm:p-4">
              <input
                placeholder="Describe your medical concern or ask for help..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border-none bg-transparent focus:outline-none text-sm sm:text-base placeholder-gray-400"
              />
              
              <div className="flex space-x-2 ml-2">
                {/* Voice control */}
                <button
                  onClick={toggleVoiceControl}
                  className={`h-8 w-8 p-0 flex items-center justify-center rounded-full transition-colors ${isListening ? 'bg-[#be1724] text-white' : 'text-gray-500 hover:text-[#be1724] hover:bg-gray-100'}`}
                >
                  <FaMicrophone className="h-4 w-4" />
                </button>
                
                {message.trim() && (
                  <button
                    onClick={handleSendMessage}
                    className="h-8 w-8 p-0 bg-[var(--primary-color)] text-white flex items-center justify-center rounded-full hover:shadow-md transition-shadow"
                  >
                    <IoIosSend className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Suggestions */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["How to treat a burn?", "Someone is fainted", "Help with bleeding wound"].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setMessage(suggestion)}
                className="px-3 py-1.5 text-xs sm:text-sm bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}