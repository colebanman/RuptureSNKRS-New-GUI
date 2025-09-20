import React, { useState, useEffect, useRef } from 'react';
import * as IoIcons from 'react-icons/io'
import * as HiIcons from 'react-icons/hi'
import Data from "../modules/dataExports"
import {
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  TrashIcon,
  PlayIcon,
  StopIcon,
  PlayCircleIcon,
  PencilIcon,
  SquaresPlusIcon,
} from "@heroicons/react/20/solid";
import ProfileShipping from '../components/ProfileShipping';
import ProfileBilling from '../components/ProfileBilling';
import { fetchOrders } from '../modules/fetchOrders';
import { Toaster } from 'react-hot-toast';
const fs = window.require("fs")
const os = window.require("os");
const homeDir = os.homedir()


export default function Accounts() {

  const globalData = new Data();
  const [accountData, setAccountData] = useState(globalData.accountData())

  const [contextMenu, setContextMenu] = useState(null);
  const contextMenuRef = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      setContextMenu(null);
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [contextMenuRef]);

  

  function handleContextMenu(event, profile) {
    event.preventDefault();
    setContextMenu({ profile, x: event.clientX, y: event.clientY });
  }


  function generateId() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
      if (i == 2 || i == 7) {
        id += '-'; // add dashes after the 2nd and 7th characters
      }
      id += chars[Math.floor(Math.random() * chars.length)]; // randomly choose a character
    }
    return id;
  }
  
  async function handleDeleteProfile(id){
    let info = [...accountData]
    let index = info.findIndex((item) => item.id === id)
    info.splice(index, 1)

    setAccountData(info)
    globalData.setAccountData(info)
  }

  
  


  const addProfile = (e) => {

    
  }

  const deleteGroup = (e) =>{

  }

  const addGroup = (e) => {
   

  }
  

    return (
      <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <div className='w-[87%] mt-6 ml-8'>
        <div className='flex flex-row'>
            <h1 className='font-medium text-md'>Accounts</h1>
            <div className='badge badge-outline badge-sm badge-secondary ml-2 mt-1'>{accountData.length} Total</div>
        </div>
        
        <label htmlFor="my-modal" className='btn btn-secondary btn-xs mt-3'>Add Account</label>

        
        <div className='w-[98%] h-[43rem] mt-5 grid grid-rows-6 grid-cols-5'>
            {
                accountData.map((account, index) => {
                    return(
                        <div onContextMenu={(event) => handleContextMenu(event, account.id)} className='w-48 h-20 bg-base-100 rounded-md'>
                            <h1 onClick={() => {navigator.clipboard.writeText(account.email)}} className='w-32 truncate ml-2 mt-2 text-sm font-medium cursor-pointer hover:brightness-75 transition-all duration-300'>{account.email}</h1>
                            <h1 onClick={() => {navigator.clipboard.writeText(account.password)}} className='w-32 cursor-pointer truncate ml-2 mt-2 text-xs font-medium hover:brightness-75 transition-all duration-300'>{(account.password).split("").map(()=>"*")}</h1>

                        </div>
                    )
                })
            }
            {contextMenu !== null ? (
              <div
                style={{
                  top: contextMenu.y,
                  left: contextMenu.x
                }}
                className='absolute z-10 bg-base-200 rounded-md shadow-xl p-2'
              >
                <button className='flex flex-row text-center align-middle font-medium' onClick={() => handleDeleteProfile(contextMenu.profile)}> <HiIcons.HiTrash className='fill-error mt-1 mr-2'></HiIcons.HiTrash> Delete Profile</button>
                <button className='flex flex-row text-center align-middle font-medium mt-2' onClick={() => fetchOrders(contextMenu.profile)}> <HiIcons.HiInbox className='fill-info mt-1 mr-2'></HiIcons.HiInbox> Fetch Orders</button>
              
              </div>
            ) : null}
        </div>

      </div>

      </>
    );
  }