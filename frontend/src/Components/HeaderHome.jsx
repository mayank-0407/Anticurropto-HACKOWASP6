import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../assets/Anti-Corrupto.png';
import { IoMenu } from 'react-icons/io5';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { setSessionToken, isLogin, logOut } from '../Utils/cookieSetup';

function HeaderHome() {
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
    navigate('/');
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Profile', 'My lands', 'Analytics', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Connect Wallet', 'Settings', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={text === 'Logout' ? handleLogout : null}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="p-3 bg-slate-300 w-screen opacity-95 flex flex-row justify-between items-center">
      {/* <div className=" h-1/6 bg-slate-800 "></div> */}

      {/* <div className="p-4 flex flex-row justify-between items-center"> */}
      <div className="flex flex-row text-gray-700 justify-center items-center rounded-lg font-bold hover:text-gray-900 ">
        <img src={logo} alt="Image" className="h-12" />
        <NavLink to={'/dashboard'}>Anti-Corruptō</NavLink>
      </div>

      <ul className="px-4 flex flex-row justify-end space-x-8  items-center">
        <li className=" hover:text-blue-600">
          <button>About</button>
        </li>
        <li className=" hover:text-blue-600">
          <NavLink to={'/dashboard'}>
            <button>Features</button>
          </NavLink>
        </li>
        <li className=" hover:text-blue-600 ">
          <button>Services</button>
        </li>
        <li className=" hover:text-blue-600">
          <button>Contact</button>
        </li>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
              <IoMenu size={24} color="black" />
            </Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
        {/* {isLoggedd ? (
					<div className="border px-5  border-slate-300  bg-slate-800 text-white text-sm rounded-lg p-2 hover:bg-gray-900">
						<button onClick={() => handleLogout()}>Logout</button>
					</div>
				) : (
					<div className="border px-5  border-slate-300  bg-slate-800 text-white text-sm rounded-lg p-2 hover:bg-gray-900">
						<NavLink to={"/login"}>Login</NavLink>
					</div>
				)} */}
      </ul>
    </div>
  );
}

export default HeaderHome;
