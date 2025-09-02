import { useState } from 'react';
import { FaHome, FaPhone, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import Logo from '../../Logo';

interface ChatSidebarProps {
  onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({onClose}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  
  const navigationItems = [
    { icon: FaHome, label: " Go to Home" },

  ];

  const bottomItems = [
    { icon: FaPhone, label: "Emergency Call", emergency: true },
  ];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`flex h-full flex-col bg-white text-[var(--primary-color)] transition-all duration-300 ${expanded ? 'w-64' : 'w-16 sm:w-20'}`}>
      {/* Logo/Brand */}
      <div className="lg:hidden absolute top-2 right-2">
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <FaTimes/>
        </button>
      </div>

      <div className="flex h-14 sm:h-16 items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg">
            <Logo isName={false} />
          </div>
          {expanded && <h1 className="text-lg font-semibold"> Aarogya </h1>}
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-white/10 transition-colors hidden md:block lg:block"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveItem(item.label)}
            className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 group cursor-pointer ${
              activeItem === item.label 
                ? "bg-[var(--primary-light)] text-white shadow-md" 
                : "text-gray-800 hover:bg-white/10 hover:text-[var(--primary-dark)]"
            }`}
          >
            <item.icon className={`h-5 w-5 ${expanded ? 'mr-3' : 'mx-auto'}`} />
            {expanded && <span className="font-medium">{item.label}</span>}
            {!expanded && (
              <div className="absolute left-14 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="space-y-2 p-4 border-t border-white/10">
        {bottomItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 group ${
              item.emergency 
                ? "bg-[var(--primary-color)] cursor-pointer text-white shadow-md hover:bg-[var(--primary-dark)]" 
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <item.icon className={`h-5 w-5 ${expanded ? 'mr-3' : 'mx-auto'}`} />
            {expanded && <span className="font-medium">{item.label}</span>}
            {!expanded && (
              <div className="absolute left-14 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;