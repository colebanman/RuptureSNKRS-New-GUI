import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as GoIcons from 'react-icons/go';
import * as IoIcons from 'react-icons/io'
import * as CgIcons from 'react-icons/cg'
import * as HiIcons from 'react-icons/hi'


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <IoIcons.IoIosRocket/>,
    text: 'Dashboard',
    cName: 'nav-text'
  },
  {
    title: 'Tasks',
    path: '/Tasks',
    icon: <HiIcons.HiViewList/>,
    text: 'Tasks',
    cName: 'nav-text'
  },
  {
    title: 'Profiles',
    path: '/Profiles',
    icon: <IoIcons.IoMdPerson/>,
    text: 'Profiles',
    cName: 'nav-text'
  },
  {
    title: 'Accounts',
    path: '/Accounts',
    icon: <IoIcons.IoMdKey/>,
    text: 'Accounts',
    cName: 'nav-text'
  },
  {
    title: 'Proxies',
    path: '/Proxies',
    icon: <IoIcons.IoIosWifi/>,
    text: 'Proxies',
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/Settings',
    icon: <IoIcons.IoMdSettings/>,
    text: 'Settings',
    cName: 'nav-text'
  },
];