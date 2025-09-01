import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AidLinkChat from './pages/ChatPage';
import ChatLayout from './components/layout/ChatLayout';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<ChatLayout/>}>
              <Route path='/' element={<AidLinkChat/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
