import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CustomLayout from './components/landing/CustomLayout';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import ViewAllCamps from './components/camp/ViewAllCamps';
import SmartFeatures from './components/landing/SmartFeatures';
import CampForm from './components/camp/CampForm';
import { ToastContainer } from 'react-toastify';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer/>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<CustomLayout/>}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/camps" element={<ViewAllCamps />} />
                <Route path="/about" element={<SmartFeatures />} />
                <Route path="/add-camp" element={<CampForm />} />
              </Route>
                <Route path='/chatbot' element={<ChatPage/>} />

                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>

  
  )
}

export default App
