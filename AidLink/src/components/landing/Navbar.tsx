import { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router";
import Logo from "../Logo";

const AppRoutes = {
  HOME: "/",
  FIRST_AID_CHAT: "/chatbot",
  HEALTH_CAMPS: "/camps",
  ABOUT: "/about",
  ADD_CAMPS: "/add-camp"
} as const;

interface NavItem {
  key: NavRoutes;
  label: string;
  path: string;
}

type NavRoutes = keyof typeof AppRoutes;

const Navbar = () => {
  const[isOpen, setIsOpen] = useState<boolean>(false);
  const[isScrolled, setIsScrolled] = useState<boolean>(false);
  const[isActive, setIsActive] = useState<NavRoutes>("HOME");
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const navItems : NavItem[] = [
    { key: "HOME", label: "Home", path: AppRoutes.HOME },
    { key: "FIRST_AID_CHAT", label: "Chatbot", path: AppRoutes.FIRST_AID_CHAT },
    { key: "HEALTH_CAMPS", label: "Health Camps", path: AppRoutes.HEALTH_CAMPS },
    { key: "ABOUT", label: "About", path: AppRoutes.ABOUT },
    { key: "ADD_CAMPS", label: "Add Camps", path: AppRoutes.ADD_CAMPS },
  ];

  const handleActiveState = (itemName : NavRoutes):void => {
    setIsActive(itemName);
  }

  const handleNavigate = (path: string):void => {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    setIsOpen(false);
  };

  const handleLogout = () =>{
    localStorage.setItem("isLoggedIn", "false");
    navigate('/')
  }

  // Set active route based on current location
  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;

    if (path === AppRoutes.HOME && !hash) {
      setIsActive("HOME");
    } else if (hash === AppRoutes.FIRST_AID_CHAT) {
      setIsActive("FIRST_AID_CHAT");
    } else if (hash === AppRoutes.ABOUT) {
      setIsActive("ABOUT");
    } else if (hash === AppRoutes.HEALTH_CAMPS) {
      setIsActive("HEALTH_CAMPS");
    } else if (hash === AppRoutes.ADD_CAMPS) {
      setIsActive("ADD_CAMPS");
    } 
  }, [location]);

  // Scroll behavior for hash links
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Scroll event listener for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <>
     <nav className={`sticky top-0 z-50 ${isScrolled ? "shadow-md bg-white" : ""}`}>
      <div className={`flex justify-between w-full items-center sticky ${isScrolled ? "bg-white" : "bg-gray-50"}  p-6 z-100`}>
        <span className="font-bold text-2xl md:ml-12 ml-6">
            <Logo isName={true}/>
        </span>

        <div className="md:hidden md:mr-12 mr-6">
          <button onClick={()=> setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none hover:text-[#F86C23]">
             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden md:flex justify-center items-center">
            <ul className="flex space-x-8 text-base">
              {navItems.map((item) => ( 
                <li key={item.key}
                onClick={() => handleNavigate(item.path)}
                className={`${isActive === item.key ? 'text-[var(--primary-color)] font-semibold': ''} 
                cursor-pointer  hover:text-[var(--primary-color)] text-lg`}
                >
                  <NavLink to={item.path} end
                  onClick={() => handleActiveState(item.key)}> {item.label}
                  </NavLink>
                </li>
              ))}   
            </ul> 
        </div> 

        <div className="hidden md:flex items-center mr-12">
              {(isLoggedIn === "true")? (
                <button onClick={handleLogout}> Logout </button>
              ): (
               <>
               <button
                  className="border-[var(--primary-color)] border-2 px-6 ml-4 py-2 rounded-xl text-[var(--primary-color)]
                  font-semibold hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
                onClick={() => navigate('/register')}
                > Signup </button>

                <button
                  className="bg-[var(--primary-color)] px-6 py-2 border-2 ml-4 rounded-xl text-white font-semibold
                  hover:bg-[var(--primary-dark)] transition-colors duration-300"
                onClick={() => navigate('/login')}
                > Login </button>
                </>
              )}
        </div> 
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-100 pb-4 px-6 shadow-md">
          <ul className="flex flex-col space-y-4 text-base mx-8">
             {navItems.map((item) => (
              <li 
                key={item.key}
                className={`hover:text-[var(--primary-color)] cursor-pointer pt-4
                 ${isActive === item.key ? 'text-[var(--primary-color)] font-semibold' : ''}`}
                onClick={() => {
                  handleActiveState(item.key);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </li>
            ))}

            <li>
              {isLoggedIn? (
                <button className="" onClick={handleLogout}> Logout </button>
              ): (
                <button onClick={() => navigate('/login')}> Login </button>
              )}
            </li>
          </ul>
        </div>
      )} 
      </nav>
    </>
  )
}

export default Navbar