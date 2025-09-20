import React, { useState } from 'react';
import { FaAddressCard, FaTasks, FaChartBar,
} from 'react-icons/fa'
import { AiOutlineClose} from "react-icons/ai"
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo from './logo.png'
var selected = (window.location.href)

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  console.log(selected + "this is selected")
  selected = (window.location.href)
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 45
        }}
        className='ml-5'
    />
);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <header className='w-screen bg-base-100 brightness-125 h-10 z-20 align-middle'>
          <img className='logo inline-block mt-0.5 ml-1' src={logo} alt="Logo" width={"35px"}/>
          <h1 draggable="true" className='heading drag inline-block font-semibold text-sm m text-secText'>Your App • v1.0.0</h1>
          <div className='absolute mt-2 right-0 align-middle inline-block'>

            <AiOutlineClose onClick={()=>{window.close()}} className='mt-1 mr-5 w-5  hover:cursor-pointer z-20 '></AiOutlineClose>

          </div>
        </header>
        <aside className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} >
                  <Link to={item.path} >
                      <SideBarIcon icon={item.icon} text={item.title}  />
                  </Link>
                </li>
              );
              
            })}
          </ul>
        </aside>
      </IconContext.Provider>
      
      
    </>
    
  );
}

const SideBarIcon = ({ icon, text ='tooooltip' }) => (
  <div draggable="false" className={selected.indexOf(text)>-1 ? " shadow-2xl rounded-lg sidebar-icon group bg-base-300" : "sidebar-icon group"}>
    {icon}
      <span draggable="false" className="sidebar-tooltip group-hover:scale-100">
          {text}
      </span>
  </div>
);

export default Navbar;
