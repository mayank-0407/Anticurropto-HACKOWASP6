import React, { useState, useEffect, useRef } from 'react';
import { isLogin, logOut } from '../Utils/cookieSetup';
import { BsFillPersonLinesFill } from 'react-icons/bs'; // Assuming this is the user icon
import Sidebar, { SidebarItem } from './ui/Sidebar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const [isLoggedd, setisLoggedd] = useState(false);
  useEffect(() => {
    const checkLoginSession = isLogin();
    if (checkLoginSession) {
      setisLoggedd(true);
    } else {
      setisLoggedd(false);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logOut();
    setisLoggedd(false);
    navigate('/');
  };

  const handleServices = () => {
    // Implement services menu logic here
    console.log('Services clicked');
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="bg-blue-950 text-white py-4 w-screen">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="flex items-center px-10">
          <img src="/Logo_1.png" alt="Logo" className="h-8 mr-4" />
          <span className="text-xl font-semibold"></span>
        </div>

        {/* <div className="flex items-center">
          <a href="#" className="px-4 hover:text-purple-700">Home</a>
          <a href="#" className="px-4 hover:text-purple-700">Services</a>
        </div> */}
        {isLoggedd ? (
          <div className="flex items-center px-10">
            <button
              onClick={() => handleLogout()}
              className="px-4 py-2 bg-purple-600 rounded-md mr-4 hover:bg-purple-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center px-10">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-purple-600 rounded-md mr-4 hover:bg-purple-700"
            >
              Login
            </button>
            <span className=" mx-1 text-purple-600">|</span>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 text-purple-600 rounded-md hover:bg-gray-700"
            >
              Signup
            </button>
          </div>
        )}

        <div>
          <button onClick={toggleSidebar}>
            <BsFillPersonLinesFill className="text-white text-2xl" />
          </button>
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleOutsideClick}>
              <div
                ref={sidebarRef}
                className="absolute top-0 right-0 bg-white w-64 shadow-lg h-full overflow-y-auto transform transition-transform duration-300 ease-in-out"
              >
                <Sidebar>
                  <SidebarItem text="Logout" onClick={handleLogout} />
                  <SidebarItem text="Services" onClick={handleServices} />
                </Sidebar>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
