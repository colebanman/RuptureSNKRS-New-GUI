import React, { useState, useEffect } from 'react';
import * as HiIcons from 'react-icons/hi'

const axios = window.require('axios');
const fetch = window.require('node-fetch');
const fs = window.require("fs")
const os = window.require("os");


export default function Dashboard() {
  
  const [chartData, setChartData] = useState([1,2,5,4,3,8,6])
  let maxDataNum = 500 / Math.max(...chartData)

  chartData.map((data,index)=>{
    chartData[index] = data * maxDataNum
  })


  const [data, setData] = useState([]);

  useEffect(() => {
    const countrySelection = (document.getElementById("countrySelection").value)
    const fetchData = async () => {
      const fetchCal = await fetch(`https://api.nike.com/product_feed/threads/v3/?anchor=0&count=50&filter=marketplace%28US%29&filter=language%28en%29&filter=upcoming%28true%29&filter=channelId%28010794e5-35fe-4e32-aaff-cd2c74f89d61%29&filter=exclusiveAccess%28true%2Cfalse%29&sort=effectiveStartSellDateAsc`)
      const fetchData = await fetchCal.json()
      const releases = []
      for(var i = 0; i < fetchData.objects.length; i++){
        try{
          console.log(fetchData.objects[i].publishedContent.properties.coverCard.properties.squarishURL)
          releases.push({
            name:fetchData.objects[i].productInfo[0].productContent.fullTitle,
            date:fetchData.objects[i].productInfo[0].merchProduct.commerceStartDate,
            img:fetchData.objects[i].publishedContent.properties.coverCard.properties.squarishURL,
            price:(fetchData.objects[i].productInfo[0].merchPrice.fullPrice).toString(),
            sku:fetchData.objects[i].productInfo[0].merchProduct.styleColor
          })
        }
        catch(err){
          console.log(err)
        }
      }
      setData(releases)
    };
    fetchData();
  }, []);

  async function handleReloadCalendar(){
    const countrySelection = (document.getElementById("countrySelection").value)
    console.log(countrySelection)
    const countryValueChart = {
      "US":"https://api.nike.com/product_feed/threads/v3/?anchor=0&count=50&filter=marketplace(US)&filter=language(en)&filter=upcoming(true)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)&filter=exclusiveAccess(true,false)&sort=effectiveStartSellDateAsc",
      "GB":"https://api.nike.com/product_feed/threads/v3/?anchor=0&count=50&filter=marketplace(GB)&filter=language(en-gb)&filter=upcoming(true)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)&filter=exclusiveAccess(true,false)&sort=effectiveStartSellDateAsc",
      "FR":"https://api.nike.com/product_feed/threads/v3/?anchor=0&count=50&filter=marketplace(FR)&filter=language(fr)&filter=upcoming(true)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)&filter=exclusiveAccess(true,false)&sort=effectiveStartSellDateAsc",
      "NZ":"https://api.nike.com/product_feed/threads/v3/?anchor=0&count=50&filter=marketplace(NZ)&filter=language(en-GB)&filter=upcoming(true)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)&filter=exclusiveAccess(true,false)&sort=effectiveStartSellDateAsc",
      "AU":"https://api.nike.com/product_feed/threads/v3/?anchor=0&count=50&filter=marketplace(AU)&filter=language(en-GB)&filter=upcoming(true)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)&filter=exclusiveAccess(true,false)&sort=effectiveStartSellDateAsc"
    }

    const fetchData = async () => {
      const fetchCal = await fetch(countryValueChart[countrySelection])
      const fetchData = await fetchCal.json()
      const releases = []
      for(var i = 0; i < fetchData.objects.length; i++){
        try{
          releases.push({
            name:fetchData.objects[i].productInfo[0].productContent.fullTitle,
            date:fetchData.objects[i].productInfo[0].merchProduct.commerceStartDate,
            img:fetchData.objects[i].publishedContent.properties.coverCard.properties.squarishURL,
            price:(fetchData.objects[i].productInfo[0].merchPrice.fullPrice).toString(),
            sku:fetchData.objects[i].productInfo[0].merchProduct.styleColor
          })
        }
        catch(err){
          console.log(err)
        }
      }
      setData(releases)
    };
    fetchData();
  }


    return (
      <>
      <div className='w-[85%]'>
            <div class="stats rounded-sm w-[98.5%] mt-5 ml-5">
        
              <div class="stat">
                <div class="stat-figure">
                  <HiIcons.HiCheck className='scale-150 fill-success'></HiIcons.HiCheck>
                </div>
                <div class="stat-title">Checkouts</div>
                <div class="stat-value">8</div>
                <div class="stat-desc">Past Week</div>
              </div>
              
              <div class="stat">
                <div class="stat-figure">
                  <HiIcons.HiX className='scale-150 fill-error'></HiIcons.HiX>
                </div>
                <div class="stat-title">Checkout Failures</div>
                <div class="stat-value">6</div>
                <div class="stat-desc">Past Week</div>
              </div>
              
              <div class="stat">
                <div class="stat-figure text-secondary">
                  <HiIcons.HiInbox className='scale-150 fill-info'></HiIcons.HiInbox>
                </div>
                <div class="stat-title">Entries</div>
                <div class="stat-value">48</div>
                <div class="stat-desc">Past Week</div>
              </div>
              
      </div>
        
        <div className='flex flex-row w-[100%]'>
          <div className='bg-base-100 w-1/2 h-[40rem] mt-5 ml-5 grid grid-flow-row gap-1 overflow-scroll'>
          <div className='flex flex-row ml-[8%] mt-4'>

          <div className='font-medium'>Upcoming Releases</div>
          <select onChange={()=>{handleReloadCalendar()}} defaultValue={"US"} id="countrySelection" className='select select-xs select-bordered ml-2 mt-0.5'>
            <option>US</option>
            <option>GB</option>
            <option>FR</option>
            <option>NZ</option>
            <option>AU</option>
          </select>

          </div>

            {data.map((release,index)=>{
              return(
                <div key={index} class="w-5/6 ml-[8%] h-36 bg-base-300 mt-5 rounded-sm">
                  <div className='flex flex-row'>
                  <div class="avatar">
                    <div class="w-28 ml-4 mt-4 mask mask-square rounded-md">
                      <img src={`https://secure-images.nike.com/is/image/DotCom/${release.sku.replace("-","_")}`} />
                    </div>
                  </div>
                    <div className='flex flex-col'>
                      <h1 className='mt-4 ml-4 font-medium truncate w-52'>{release.name}</h1>
                      <div className='flex flex-row'>
                        <div class="badge-outline badge-primary badge ml-4 mt-2 font-medium">{release.sku}</div>
                        <div class="badge-outline badge badge-primary ml-2 mt-2">${release.price}</div>
                      </div>
                      <div class="badge-outline badge badge-secondary ml-4 mt-2">{new Date(release.date.substring(0,release.date.length-1)).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='bg-base-100 w-[55%] h-[40rem] mt-5 ml-5 overflow-scroll'>
          
          <div className='flex flex-row ml-[8%] mt-4 mb-5'>

          <div className='font-medium'>Recent Checkouts</div>
          <select className='select select-xs select-bordered ml-2 mt-0.5'>
            <option>24h</option>
            <option>7d</option>
            <option>30d</option>
            <option>All Time</option>

          </select>

          </div>

          <table className="table table-compact w-[89%] ml-[8%]">
              <thead>
                <tr>
                  <th>IMG</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <img width={25} className='rounded-md ml-2.5 mt-2' src='https://images.nike.com/is/image/DotCom/DD1391_100'></img>
                  <td>Dunk Low Men's Shoe</td>
                  <td>$110</td>
                  <td>12</td>
                </tr>
                <tr>
                  <img width={25} className='rounded-md ml-2.5 mt-2' src='https://images.nike.com/is/image/DotCom/DD1391_100'></img>
                  <td>Dunk Low Men's Shoe</td>
                  <td>$110</td>
                  <td>11</td>
                </tr>
                <tr>
                  <img width={25} className='rounded-md ml-2.5 mt-2' src='https://images.nike.com/is/image/DotCom/DD1391_100'></img>
                  <td>Dunk Low Men's Shoe</td>
                  <td>$110</td>
                  <td>14</td>
                </tr>
              </tbody>
          </table>
          </div>
        </div>
        

      </div>

          
       

      </>
    );
  }