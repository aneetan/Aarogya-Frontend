import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'

const CustomLayout = () => {
  return (
    <>
    <div className='min-h-screen'>
      <Navbar/>
         <main>
            <Outlet/>
         </main>
      <Footer/>
    </div>
    </>
  )
}

export default CustomLayout