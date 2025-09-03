import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AidLinkChat from './pages/ChatPage';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<AidLinkChat/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
