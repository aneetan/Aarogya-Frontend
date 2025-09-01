import { useState } from "react";
import type { Message } from "../../types/chat.types";

const ChatInputArea = () => {
   const [messages, setMessages] = useState<Message[]>([
       {
         id: '1',
         text: "Hello! I'm AidLink, your first aid assistant. How can I help you today?",
         sender: 'bot',
         timestamp: new Date(),
       }
     ]);
   const [inputText, setInputText] = useState('');

   const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    
    // Add to chat history if it's a new conversation
    if (messages.filter(m => m.sender === 'user').length === 0) {
      setChatHistory([
        {
          id: Date.now().toString(),
          title: inputText.slice(0, 30) + (inputText.length > 30 ? '...' : ''),
          timestamp: new Date(),
          preview: inputText.slice(0, 60) + (inputText.length > 60 ? '...' : '')
        },
        ...chatHistory
      ]);
    }
    
    setInputText('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = "";
      let isFirstAidStep = false;
      
      // Simple response logic based on keywords
      if (inputText.toLowerCase().includes('burn')) {
        botResponse = "For minor burns: 1) Cool the burn under cool running water for 10-15 minutes. 2) Apply a sterile dressing. 3) Take pain relief if needed. 4) Do not apply ice, creams or greasy substances. For serious burns, seek immediate medical attention.";
        isFirstAidStep = true;
      } else if (inputText.toLowerCase().includes('heart') || inputText.toLowerCase().includes('chest')) {
        botResponse = "Heart attack symptoms include: chest pain or discomfort, shortness of breath, pain in arms, back, neck or jaw, nausea, cold sweat. If you suspect a heart attack, call emergency services immediately and have the person sit rest while waiting for help.";
        isFirstAidStep = true;
      } else if (inputText.toLowerCase().includes('cpr')) {
        botResponse = "CPR steps: 1) Check responsiveness and call for help. 2) Open airway. 3) Check breathing. 4) Give 30 chest compressions (2 inches deep at 100-120/min). 5) Give 2 rescue breaths. 6) Continue until help arrives or person recovers. Note: Compression-only CPR is also effective if you're untrained.";
        isFirstAidStep = true;
      } else if (inputText.toLowerCase().includes('nosebleed')) {
        botResponse = "To stop a nosebleed: 1) Sit upright and lean forward. 2) Pinch the soft part of your nose for 10-15 minutes. 3) Breathe through your mouth. 4) Apply a cold compress to the bridge of your nose. 5) Avoid blowing your nose for several hours after it stops.";
        isFirstAidStep = true;
      } else {
        const randomResponses = [
          "Based on your description, here's what I recommend for first aid...",
          "For that situation, the first aid steps are...",
          "It's important to remain calm. Here's what you should do...",
          "That's a common first aid question. The recommended approach is..."
        ];
        botResponse = randomResponses[Math.floor(Math.random() * randomResponses.length)];
      }
      
      const newBotMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        isFirstAidStep
      };

      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 2000);
  };
   
  return (
     <div className="p-3 bg-white border-t border-gray-200">
      <div className="flex items-center">
      <button className="p-2 text-gray-400 hover:text-gray-600 mr-1">
         <span className="text-xl">+</span>
      </button>
      <input
         type="text"
         value={inputText}
         onChange={(e) => setInputText(e.target.value)}
         onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
         placeholder="Describe your first aid situation..."
         className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
      <button
         onClick={handleSendMessage}
         disabled={inputText.trim() === ''}
         className={`bg-red-600 text-white rounded-r-lg px-4 py-2 font-semibold ${
            inputText.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
         }`}
      >
         Send
      </button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
      AidLink provides first aid guidance only. In emergencies, always call local emergency services.
      </p>
   </div>
  )
}

export default ChatInputArea
