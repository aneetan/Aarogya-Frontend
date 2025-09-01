import { useEffect, useRef, useState } from "react";
import type { ChatHistoryProps, Message, SuggestedQuestion } from "../types/chat.types";
import ChatHistory from "../components/chat/ChatHistory";
import ChatMessage from "../components/ChatMessage";
import TypingIndicator from "../components/chat/TypingIndicator";
import SuggestedQuestions from "../components/chat/SuggestedQuestions";
import InputArea from "../components/chat/InputArea";

const AidLinkChat: React.FC = () => {
  // State for messages and input
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm AidLink, your first aid assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: '2',
      text: "I can provide guidance on common first aid procedures, emergency instructions, and general medical advice. Remember, I'm not a substitute for professional medical help in emergencies.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryProps[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions for the user
  const suggestedQuestions: SuggestedQuestion[] = [
    { id: 'q1', text: 'How to treat a burn?', category: 'Burns' },
    { id: 'q2', text: 'What are the signs of a heart attack?', category: 'Cardiac' },
    { id: 'q3', text: 'How to perform CPR?', category: 'CPR' },
    { id: 'q4', text: 'How to stop a nosebleed?', category: 'Bleeding' },
    { id: 'q5', text: 'What to do for a sprained ankle?', category: 'Injuries' },
    { id: 'q6', text: 'How to recognize a stroke?', category: 'Neurological' },
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
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

  // Handle clicking a suggested question
  const handleSuggestedQuestionClick = (question: string) => {
    setInputText(question);
  };

  // Start a new chat
  const startNewChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm AidLink, your first aid assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <ChatHistory
        history={chatHistory}
        onNewChat={startNewChat}
      />
      
      <div className="flex-1 flex flex-col">        
        {/* Chat messages container */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message.text} isUser={message.sender !== 'bot'} />
          ))}
          
          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggested questions */}
        <SuggestedQuestions 
          questions={suggestedQuestions} 
          onQuestionClick={handleSuggestedQuestionClick}
        />
        
        {/* Input area */}
        <InputArea 
          inputText={inputText}
          onInputChange={setInputText}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default AidLinkChat;