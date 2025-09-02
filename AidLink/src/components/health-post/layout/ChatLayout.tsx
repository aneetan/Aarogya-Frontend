import { useState } from 'react'
import { Outlet } from 'react-router';
import ChatHeader from './ChatHeader';
import ChatSidebar from './Sidebar';


const ChatLayout= () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <ChatHeader onClick={toggleSidebar} isOpen={isSidebarOpen} />
            <ChatSidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
               {/* <ChatHistory onNewChat= {onNewChat} history = {history} /> */}
            </ChatSidebar>

            {/* Main content */}
            <main className={`h-fit bg-white pt-16 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64 ' : 'ml-16'} p-4 mt-4`}>
                <Outlet />
            </main>
        </div>
    )
}

export default ChatLayout