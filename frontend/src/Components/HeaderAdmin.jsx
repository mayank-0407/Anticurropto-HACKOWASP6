import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { loginUser } from '../Utils/API/authAPI';
import { setSessionToken, isLogin, logOut } from '../Utils/cookieSetup';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Anti-Corrupto.png';

function HeaderAdmin() {
  const [isLoggedd, setisLoggedd] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkLoginSession = isLogin();
    if (checkLoginSession) {
      setisLoggedd(true);
    } else {
      setisLoggedd(false);
    }
  }, []);

  const handleLogout = () => {
    logOut();
    setisLoggedd(false);
    navigate('/login');
  };
  return (
    <div className=" h-20 bg-slate-300 w-screen flex-row opacity-90 absolute top-0 items-center">
      <div className=" h-1/6 bg-slate-800 "></div>

      <div className="p-4 flex flex-row justify-between items-center">
        <div className="pl-2 flex flex-row justify-center items-center text-gray-700 rounded-lg font-bold hover:text-gray-900 ">
          <img src={logo} alt="Image" className="h-12" />
          <NavLink to={'/dashboard'}>Anti-Corruptō</NavLink>
        </div>

        <ul className="h-5/6 flex flex-row justify-center space-x-8  items-center">
          {/* <li className="border pr-8 border-slate-300 h-1/2 border-r-slate-950 hover:text-blue-600 hover:border-r-blue-600">
						<NavLink to={"/"}>
							<button>Home</button>
						</NavLink>
					</li>
					<li className="border pr-8 border-slate-300 h-1/2 border-r-slate-950  hover:text-blue-600 hover:border-r-blue-600">
						<NavLink to={"/addland"}>
							<button>Add Land</button>
						</NavLink>
					</li>
					<li className="border pr-8 border-slate-300 h-1/2  hover:text-blue-600 ">
						<NavLink to={"/transfer"}>
							<button>Transfer Land</button>
						</NavLink>
					</li> */}
          {/* <li className="border  border-slate-300 h-1/2 pr-8  hover:text-blue-600">
						<button>Profile</button>
					</li> */}
        </ul>

        {isLoggedd ? (
          <div className="border px-5  border-slate-300  bg-slate-800 text-white text-sm rounded-lg p-2 hover:bg-gray-900">
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
        ) : (
          <div className="border px-5  border-slate-300  bg-slate-800 text-white text-sm rounded-lg p-2 hover:bg-gray-900">
            <NavLink to={'/login'}>Login</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderAdmin;
