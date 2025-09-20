import React, { useState, useEffect } from 'react';
import * as IoIcons from 'react-icons/io'
import * as HiIcons from 'react-icons/hi'
import Data from "../modules/dataExports"

import {NikeUS} from "../modules/NikeUs"

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
import { Toaster } from 'react-hot-toast';
const fs = window.require("fs")
const os = window.require("os");
const homeDir = os.homedir()


export default function Dashboard() {
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

  const [selectedGroup, setSelectedGroup] = useState(taskGroups.length > 0 ? taskGroups[0].id : null);




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
  
  async function deleteTask(id){
    if(taskData.length > 1){
      const taskIndex = taskData.findIndex(task => task.id === id)
      const taskInfo = [...taskData]; // make a copy of the array
      taskInfo.splice(taskIndex, 1);
      setTaskData(taskInfo);
      globalData.setTaskData(taskInfo);
    }
  }
  


  const addTask = (e) => {
    let siteOption = document.getElementById("siteOption").value
    let profileOption = document.getElementById("profileOption").value
    let sizes = (document.getElementById("sizes").selectedOptions)
    let shockDrop = document.getElementById("shockDrop").value
    let taskAmt = parseInt(document.getElementById("taskAmount").value)

    let proxynode = document.getElementById("proxyOption");
    let proxy = proxynode.options[proxynode.selectedIndex].text;

    let taskInfo = [...taskData]; // make a copy of the array

    let validProfiles = []
    for(var i = 0; i < profileData.length; i++){
      if(profileData[i].groupID == profileOption){
        validProfiles.push(profileData[i])
      }
    }

    for(var i = 0; i < taskAmt; i++){
      let taskId = generateId()
      let randomSize = sizes[Math.floor(Math.random() * sizes.length)].value

      let selectedProxy = "";

      console.log("Proxy: " + proxy)

      for (var x = 0; x < proxyData.length; x++) {
            if ((proxyData[x].id == proxy)) {
              selectedProxy = proxyData[x].proxies.split("\n")[i];
            }
      }

      let selectedProfile = validProfiles[i].name
      let selectedId = validProfiles[i].id;




      taskInfo.push({
        id: taskId,
        site: siteOption,
        monitorInput: "N/A",
        size: randomSize,
        brave: false,
        prelaunch: shockDrop,
        delay: 3000,
        profile: {
          id: selectedId,
          label: selectedProfile,
        },
        account: {
          id: accountData[i].email,
          accountGroup: accountData[i].id,
        },
        proxy: {
          proxy: selectedProxy,
        },
        status: "Idle",
        groupID: selectedGroup,
      })     
    }

    setTaskData(taskInfo);
    globalData.setTaskData(taskInfo);
    
  }
  const deleteGroup = (e) =>{
    let groupId = e.target.parentNode.id
    let groupIndex = taskGroups.findIndex(group => group.id === groupId)
    let groupData = [...taskGroups]
    groupData.splice(groupIndex, 1)
    setTaskGroups(groupData);
    globalData.setTaskGroups(groupData)
  }
  const addGroup = (e) => {
    let groupId = generateId()
    let groupName = document.getElementById("groupName").value
    let groupMonitor = document.getElementById("groupMonitor").value
    let groupData = [...taskGroups, {
      id: groupId,
      title: groupName,
      tasks: "0",
      stats: {
        totalAmount: 0,
        running: [],
        carts: [],
        checkouts: [],
        declines: [],
      },
      search: "",
      showSearch: false,
      selectedCatagory: null,
      product: {
        threadId: "",
        productId: "",
        releaseMethod: "",
        site: "",
        productUrl: "",
        releaseDateIso: "",
        url: "",
        sizes: [],
        price: "",
        status: "Sleeping...",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
        sku: groupMonitor,
      }}]

      setTaskGroups(groupData);
      globalData.setTaskGroups(groupData)
      setSelectedGroup(groupId)

  }
  

    return (
      <>
<Toaster position="bottom-right" reverseOrder={true} />
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Add Task Group</h3>

      <div className="form-control w-full mt-1">
        <label className="label">
          <span className="label-text -ml-1">Group Name</span>
        </label>
        <input id="groupName" type="text" placeholder="Group Name" className="input input-sm input-bordered w-full max-w-xs " />
        <label className="label">
        </label>
      </div>

      <div className="form-control w-full -mt-2">
        <label className="label">
          <span className="label-text -ml-1">Monitor Input</span>
        </label>
        <input id="groupMonitor" type="text" placeholder="Monitor Input" className="input input-sm input-bordered w-full max-w-xs " />
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

<input type="checkbox" id="addTask" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Add Task</h3>

      <div className="form-control w-full mt-1 -ml-1">

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Site</span>
          </label>
          <select id="siteOption" className="select select-bordered select-sm">
            <option value="Nike US">Nike US</option>
            <option value="Nike GB">Nike GB</option>

          </select>

          <label className="label">
            <span className="label-text">Profile Group</span>
          </label>
          <select id="profileOption" className="select select-bordered select-sm">
            {profileGroups.map((item,index)=>{
              return (
                <option value={item.id} group={item.id}>
                  {item.title}
                </option>
              );
            })}
            
          </select>

          <label className="label">
            <span className="label-text">Account</span>
          </label>
          <select id="accountOption" className="select select-bordered select-sm">
                  <option key="All" value="All">
                    All
                  </option>
                  {accountData.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.email}
                      </option>
                    );
                  })}
          </select>

          <label className="label">
            <span className="label-text">Proxy Group</span>
          </label>
          <select id="proxyOption" className="select select-bordered select-sm">
                  <option value={"None"} key={"None"}>
                    None
                  </option>
                  {proxyData.map((item, index) => {
                    return (
                      <option value={proxyData[index].id} key={index}>
                        {proxyData[index].groupName}
                      </option>
                    );
                  })}
          </select>

          <label className="label">
            <span className="label-text">Size</span>
          </label>
          <select multiple id="sizes" className="select select-bordered select-sm">
                  {['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '3.5Y', '4Y', '4.5Y', '5Y', '5.5Y', '6Y', '6.5Y', '7Y', '7.5Y', '8Y', '8.5Y', '9Y', '9.5Y', '10Y', '10.5Y', '11Y', '11.5Y', '12Y', '12.5Y', '13Y'].map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
          </select>
          

          <div className='flex flex-row mt-2'>
            <label className="label">
              <span className="label-text">Shock Drop Mode</span>
            </label>
            <input id="shockDrop" type="checkbox" class="toggle toggle-sm mt-2 ml-3" />
          </div>

          
          

        </div>
      
      </div>



    <div className="modal-action">
      <input type="text" id="taskAmount" defaultValue={1} placeholder="Type here" className="input input-bordered input-sm w-12 h-12 text-center max-w-xs" />
      <label htmlFor="addTask" onClick={addTask} className="btn">Add</label>
    </div>
    <div className="modal-action">
      <label htmlFor="addTask" className="btn btn-xs absolute right-5 top-5 bg-opacity-0"><HiIcons.HiX width={10}></HiIcons.HiX></label>
    </div>
  </div>
</div>
      

      <div className='w-[87%]'>
        <div className='flex flex-row'>

        <div className='mt-6 ml-8 w-[100%]'>
          <div className='flex flex-row'>
            <h1 className='font-medium text-md align-middle'>Task Groups</h1>
            <label htmlFor="my-modal" className='btn btn-secondary ml-5 btn-xs mt-0.5'>Add Group</label>
          </div>

          <div className='flex flex-row overflow-x-scroll gap-3 h-32 overflow-hidden'>      

              {taskGroups.map((item,index)=>{
                return(
                    <div onClick={()=>{setSelectedGroup(item.id)}} id={item.id} className={selectedGroup == item.id ? "TaskGroup outline-info outline-1" : "TaskGroup"}>
                        <span id={item.id + "monitor"} className='hidden'>idle</span>
                        <HiIcons.HiOutlineX onClick={deleteGroup} className='w-3 absolute z-10 ml-[14.5rem] mt-2 cursor-pointer'></HiIcons.HiOutlineX>
                        <h1 className='mt-2 ml-2 font-medium text-sm w-48 truncate'>{item.title}</h1>
                        <div className='flex flex-row'>
                          <h2 className='badge badge-outline badge-info badge-sm mt-2 ml-2 font-medium text-[0.65rem] brightness-75 truncate w-32'>{item.product.sku}</h2>
                        </div>
                        <div className='flex flex-row'>
                          <h2 className='badge badge-outline badge-sm badge-secondary mt-2 ml-2 font-medium text-[0.65rem] brightness-75'>Idle</h2>
                          <h2 className='badge badge-outline badge-sm badge-secondary mt-2 ml-2 font-medium text-[0.65rem] brightness-75'>{taskData.filter(obj => obj.groupID == item.id).length} Tasks</h2>

                        </div>
                    </div>
                )
              })}

          </div>

          <div className='divider'></div>

          <div className='flex flex-row absolute w-[83%]'>
            <h1 className='font-medium'>Tasks</h1>
            <label htmlFor="addTask" className='btn btn-secondary ml-5 btn-xs mt-0.5'>Add Task</label>
          </div>
          
          <div className="mt-16 overflow-y-scroll h-[31rem]">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Profile</th>
                  <th>Account</th>
                  <th>Proxy</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>⠀</th>
                  <th>⠀</th>
                  <th>⠀</th>


                </tr>
              </thead>
              <tbody>
                {
                  taskData.map((item,index)=>{
                    if(item.groupID == selectedGroup){
                      return(
                        <tr id={item.id}>
                          <th className='w-16 truncate'>{item.site}</th>
                          <th className='w-32'>{item.profile.label.substring(0,12) + "..."}</th>
                          <th data-tip={item.account.id} className='w-2 truncate'>{item.account.id.substring(0,15) + "..."}</th>
                          <th className='w-36'>{item.proxy.proxy}</th>
                          <th className='w-12'>{item.size}</th>
                          <th className='w-32 truncate'>
                            <div className=' w-56 truncate' id={`${item.id + "status"}`}>
                              {item.status}
                            </div>
                          </th>
                          <th className='w-4 cursor-pointer hover:brightness-125 transition-all duration-300'>
                            <div>
                              <PlayIcon id={`${item.id + "start"}`} style={{ visibility: "visible" }} onClick={()=>{NikeUS(item.id, (item.site).split(" ")[1])}} className='fill-info w-5'></PlayIcon>
                              <StopIcon id={`${item.id + "stop"}`} style={{ visibility: "hidden" }} className="w-5 fill-fail z-10 -mt-5"></StopIcon>
                            </div>
                          </th>
                          {/* <th id={`${item.id + "stop"}`} style={{ visibility: "hidden" }} className='w-4 cursor-pointer hover:brightness-125 transition-all duration-300'>
                            
                          </th> */}
                          <th className='w-4 cursor-pointer hover:brightness-125 transition-all duration-300'>
                            <PencilIcon className='w-5 fill-secondary'></PencilIcon>
                          </th>
                          <th onClick={()=>{deleteTask(item.id)}} className='w-16 cursor-pointer hover:brightness-125 transition-all duration-300'>
                            <MinusIcon className='w-5 fill-gray-200'></MinusIcon>
                          </th>
                        </tr>
                      )
                    }
                    else{
                      console.log(item.groupID)
                    }  
                  })
                }
              </tbody>
            </table>
          </div>
          
        </div>

        {/* <div className='w-[20%] h-24 ml-4'>

          <h1 className='font-medium text-md mt-2 ml-2'>Task Overview</h1>
          <h2 className='font-medium text-sm mt-4 ml-2'>Products</h2>

          <div className='w-52 h-28 bg-base-100 rounded-md mt-2 ml-2 flex flex-row'>
            <div className='ml-3 mt-6 flex flex-row w-52 h-28'>
              <img className='rounded-md w-16 h-16' src='https://images.nike.com/is/image/DotCom/FN1868_100'></img>
              
              <div className='flex flex-col'>
               <h1 className='ml-2 font-medium text-xs'> Air Force 1 '07 </h1>
               <h1 className='ml-2 font-medium text-[0.7rem]'> $120 </h1>
              </div>
              

            </div>
          </div>
          <h2 className='font-medium text-sm mt-4 ml-2'>Tasks</h2>
          <div className='w-52 h-8 bg-base-100 rounded-md ml-2 mt-2 flex flex-row'>
            <h1 className='text-xs font-medium mt-1.5 ml-2'>0 Tasks Running</h1>
            <HiIcons.HiArrowRight className='fill-secondary mt-2 ml-2'/>
          </div>

          <div className='w-52 h-8 bg-base-100 rounded-md ml-2 mt-2 flex flex-row'>
            <h1 className='text-xs font-medium mt-1.5 ml-2'>0 Entries</h1>
            <HiIcons.HiInbox className='fill-info mt-2 ml-2'/>
          </div>
          <div className='w-52 h-8 bg-base-100 rounded-md ml-2 mt-2 flex flex-row'>
            <h1 className='text-xs font-medium mt-1.5 ml-2'>0 Checkouts</h1>
            <HiIcons.HiCheck className='fill-success mt-2 ml-2'/>
          </div>
          <div className='w-52 h-8 bg-base-100 rounded-md ml-2 mt-2 flex flex-row'>
            <h1 className='text-xs font-medium mt-1.5 ml-2'>0 Failures</h1>
            <HiIcons.HiX className='fill-error mt-2 ml-2'/>
          </div>

          <h2 className='font-medium text-sm mt-4 ml-2'>Controls</h2>
          <div className='w-52 h-8 bg-base-100 rounded-md ml-2 mt-2 flex flex-row'>
            <h1 className='text-xs font-medium mt-1.5 ml-2'>Start All</h1>
            <PlayIcon className='fill-success -mt-0.5 ml-2 w-3'/>

          </div>
          <div className='w-52 h-8 bg-base-100 rounded-md ml-2 mt-2 flex flex-row'>
            <h1 className='text-xs font-medium mt-1.5 ml-2'>Stop All</h1>
            <StopIcon className='fill-error -mt-0.5 ml-2 w-3'/>

          </div>





        </div> */}

        </div>


      </div>

        
     
      


      

      </>
    );
  }