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
import axios from 'axios';

const fs = window.require("fs")
const os = window.require("os");
const homeDir = os.homedir()


export default function Profiles() {
  // const [searchFilter, setSearchFilter] = useState("@");

  // const setSelected = (e) =>{
  //   setSelectedGroup(e)
  // } 

  const globalData = new Data();
  const [taskData, setTaskData] = useState(globalData.taskData())
  const [taskGroups, setTaskGroups] = useState(globalData.taskGroups())
  const [profileData, setProfileData] = useState(globalData.profileData())
  const [profileGroups, setProfileGroups] = useState(globalData.profileGroups())
  const [proxyData, setProxyData] = useState(globalData.proxyData())
  const [accountData, setAccountData] = useState(globalData.accountData())
  const [profileStep, setProfileStep] = useState("shipping")

  
  if(proxyData.length == 0){
    let proxies = [...profileData]
    proxies.push({
      id:generateId(),
      name:"Default Group",
      proxies:""
    })
    setProxyData(proxies)
    globalData.setProxyData(proxies)
  }
  
  
  const [selectedGroup, setSelectedGroup] = useState(proxyData[0].id);
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
    // const taskIndex = profileData.findIndex(task => task.id === id)
    // const taskInfo = [...profileData]; // make a copy of the array
    // taskInfo.splice(taskIndex, 1);
    // setProfileData(taskInfo);
    // globalData.setProfileData(taskInfo);
  }
  


  const addProfile = (e) => {
      // let profileName = document.getElementById("profileName").value;
      // let fullName = document.getElementById("fullName").value;
      // let email = document.getElementById("email").value;
      // let phone = document.getElementById("phone").value;
      // let addressLine1 = document.getElementById("addressLine1").value;
      // let addressLine2 = document.getElementById("addressLine2").value;
      // let city = document.getElementById("city").value;
      // let state = document.getElementById("state").value;
      // let zip = document.getElementById("zip").value;
      // let cardHolder = document.getElementById("cardHolder").value;
      // let cardNumber = document.getElementById("cardNumber").value;
      // let cardCvv = document.getElementById("cardCvv").value;
      // let cardExpiration = document.getElementById("cardExpiration").value.split("-");
      // var exp_yr = cardExpiration[0]
      // var exp_mo = cardExpiration[1]

      

      // let profiles = [...profileData];
      // profiles.push({
      //   "name": profileName,
      //   "email": email,
      //   "phoneNumber": phone,
      //   "billingSameAsShipping": true,
      //   "oneCheckout": true,
      //   "quickTask": false,
      //   "card": {
      //       "holder": cardHolder,
      //       "number": cardNumber,
      //       "expiration": exp_mo + "/" + exp_yr,
      //       "cvv": cardCvv
      //   },
      //   "shipping": {
      //       "firstName": fullName.split(" ")[0],
      //       "lastName": fullName.split(" ")[1],
      //       "addressLine1": addressLine1,
      //       "addressLine2": addressLine2,
      //       "city": city,
      //       "countryName": "United States",
      //       "countryCode": "US",
      //       "state": state,
      //       "zipCode": zip
      //   },
      //   "id": generateId(),
      //   "groupID":selectedGroup
      //   })

      // setProfileData(profiles);
      // globalData.setProfileData(profiles);
    
  }

  const deleteGroup = (e) =>{
    let id = e.target.parentNode.id
    const taskIndex = proxyData.findIndex(task => task.id === id)
    const taskInfo = [...proxyData]; // make a copy of the array
    taskInfo.splice(taskIndex, 1);
    setProxyData(taskInfo);
    globalData.setProxyData(taskInfo);

    setSelectedGroup(proxyData[0].id);
  }

  const addGroup = (e) => {

    let groupName = document.getElementById("groupName").value;
    let proxyBulk = document.getElementById("proxies").value;



    let groups = [...proxyData];
    groups.push({
      id: generateId(),
      groupName: groupName,
      proxies: proxyBulk
    })

    globalData.setProfileData(groups);
    setProxyData(groups);
   

  }


  

    return (
      <>

<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Add Proxy Group</h3>

      <div className="form-control w-full mt-1">
        <label className="label">
          <span className="label-text -ml-1">Group Name</span>
        </label>
        <input id="groupName" type="text" placeholder="Group Name" className="input input-sm input-bordered w-full max-w-xs " />
        <label className="label">
        </label>

        <label className="label">
          <span className="label-text -ml-1">Proxies</span>
        </label>
        <textarea id="proxies" className='textarea textarea-bordered resize-none'></textarea>
        <label className="label">
        </label>
      </div>

    <div className="modal-action">
      <label htmlFor="my-modal" onClick={addGroup} className="btn">Add</label>
    </div>

    <div className="modal-action">
      <label htmlFor="my-modal" className="btn btn-xs absolute right-5 top-5 bg-opacity-0"><HiIcons.HiX width={10}></HiIcons.HiX></label>
    </div>
  </div>
</div>

<input type="checkbox" id="addProfile" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Add Proxy Group</h3>



      <div className="form-control w-full mt-1 -ml-1">
          <div className="form-control w-full max-w-xs">

          </div>
      </div>


    <div className="modal-action">
      <label htmlFor="addProfile" onClick={addProfile} className="btn">Add</label>
    </div>
    <div className="modal-action">
      <label htmlFor="addProfile" className="btn btn-xs absolute right-5 top-5 bg-opacity-0"><HiIcons.HiX width={10}></HiIcons.HiX></label>
    </div>
  </div>
</div>
      

      <div className='w-[85%]'>
        <div className='mt-6 ml-8'>
          <div className='flex flex-row'>
            <h1 className='font-medium text-md align-middle'>Proxy Groups</h1>
            <label htmlFor="my-modal" className='btn btn-secondary ml-5 btn-xs mt-0.5'>Add Group</label>
          </div>
          <div className='flex flex-row'>

          <div className='flex flex-col overflow-x-scroll gap-3 w-72 h-[45rem] overflow-hidden'>      

              {proxyData.map((item,index)=>{
                return(
                    <div onClick={()=>{setSelectedGroup(item.id)}} id={item.id} className={selectedGroup == item.id ? "TaskGroup outline-info outline-1" : "TaskGroup"}>
                        <HiIcons.HiOutlineX onClick={deleteGroup} className='w-3 absolute z-10 ml-[14.5rem] mt-2 cursor-pointer'></HiIcons.HiOutlineX>
                        <h1 className='mt-2 ml-2 font-medium text-sm'>{item.groupName}</h1>
                        <div className='flex flex-row'>
                          <h2 className='badge badge-outline badge-sm badge-secondary mt-2 ml-2 font-medium text-[0.65rem] brightness-75'>{(item.proxies).split("\n").length} Proxies</h2>
                        </div>
                    </div>
                )
              })}

              </div>

              <div className='w-1 h-[45rem] bg-base-100 ml-2 rounded-md'></div>
              
              <div className='flex flex-col ml-5 overflow-scroll'>

              {
                proxyData.filter(item => item.id == selectedGroup).map((item,index)=>{
                  return(
                    item.proxies.split("\n").map((proxy,index)=>{
                      return(
                        <div className='bg-base-100 inline-block font-medium rounded-md align-middle mt-2 w-[46rem] h-8 text-center'>
                          <h1 className='mt-1 ml-2'>{proxy}</h1>
                        </div>
                      )
                    })
                  )
                })
              }

              </div>
             

          </div>
         

         
          
        </div>


      </div>

        
     
      
      </>
    );
  }