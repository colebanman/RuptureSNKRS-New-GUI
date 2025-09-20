const puppeteer = window.require('puppeteer-extra')
const path = window.require("node:path")
const findChrome = window.require("chrome-finder")
const os = window.require('os')
const userHomeDir = os.homedir();
const fs = window.require('fs');
const revealCard = window.require('credit-card-reveal')
const ChromeLauncher = window.require('chrome-launcher');
const CDP = window.require('chrome-remote-interface')
const { Webhook,MessageBuilder } = window.require('discord-webhook-node');
const WebhookURL = fs.readFileSync(userHomeDir + "\\AppData\\Roaming\\your-app-name\\Webhook")
const delay = window.require('delay');
const axios = window.require("axios")
const { Logtail } = window.require("@logtail/node");

const logtail = new Logtail("YOUR_LOGTAIL_TOKEN_HERE");

export async function NikeLogin(accountEmail,accountPass,server,proxyuser,proxypass, id,zip,address,address2,city,last,first,phone,state,card,expiration,cvv){
    // Launch Chrome
    changeStatus("Launching Browser`...`")

    const chrome = await ChromeLauncher.launch({
        chromeFlags: [
            '--no-first-run',
             '--disable-blink-features=AutomationControlled',
              '--test-type',
              '--proxy-server='+server,
              `--window-size=${Math.floor(Math.random() * (1500 - 1100 + 1)) + 1100},${Math.floor(Math.random() * (900 - 700 + 1)) + 600}`,
                 '--enable-features=ReduceUserAgent',
                   '--flag-switches-begin',
                    '--flag-switches-end',
       ],
       chromePath: findChrome(),
       ignoreDefaultFlags:true,
       userDataDir: path.resolve(userHomeDir + "/AppData/Roaming/your-app-name/StoredSessions/" + accountEmail),
    })

    changeStatus("Connecting to Browser...")

    const client = await CDP({ port: chrome.port })
    var {Network, Page, Runtime, Input, Fetch, DOM} = client;

    // Declare Starting Variables

    const PROXY_AUTH = {
        username: proxyuser,
        password: proxypass
    };

    Fetch.authRequired(({requestId}) => {
        Fetch.continueWithAuth({
            requestId,
            authChallengeResponse: {
                response: 'ProvideCredentials',
                ...PROXY_AUTH
            }
        });
      });
      Fetch.requestPaused(({requestId}) => {
          Fetch.continueRequest({requestId});
      });
    await Fetch.enable({handleAuthRequests: true});

    let emailStatus = 0;
    let passwordStatus = 0;

    // Declare Login Network Loggin

    Network.responseReceived(async ({response}) => {
        if (response.url=="https://accounts.nike.com/credential_lookup/v1") {
            emailStatus = response.status
        }
        else if( response.url == "https://accounts.nike.com/challenge/password/v1") {
            passwordStatus = response.status
        }
        // else if (response.url == "https://accounts.nike.com/check/v1") {
        //     codeStatus = response.status
        // }
    });
    
    async function clickButton(selector){
        const { root } = await DOM.getDocument();
        const { nodeId } = await DOM.querySelector({
            selector: selector,
            nodeId: root.nodeId,
        });
        const { model } = await DOM.getBoxModel({ nodeId });
    
        const xValues = model.border.filter((_, index) => index % 2 === 0);
        const yValues = model.border.filter((_, index) => index % 2 !== 0);
        const x = (xValues.reduce((acc, curr) => acc + curr, 0) / xValues.length);
        const y = (yValues.reduce((acc, curr) => acc + curr, 0) / yValues.length);
        
        var options = { x: x, y: y, button: 'left', clickCount: 1, type:"" };
    
        options.type="mousePressed"
        await client.Input.dispatchMouseEvent(options)
        options.type = 'mouseReleased';
        await client.Input.dispatchMouseEvent(options);

        return true;
    }

    async function typeText(text){
        for(var i = 0; i<text.length; i++){
            await new Promise(r => setTimeout(r, (Math.random()*400)));
            await Input.dispatchKeyEvent({ type: 'char', text: text.substring(i, i+1) })
        }
        return true;
    }

    await Promise.all([DOM.enable(), Page.enable(), Network.enable()]);

    changeStatus("Loading Homepage...")

    await Page.navigate({url: 'https://www.nike.com/'});
    await Page.loadEventFired();

    changeStatus("Logging In..")

    let isLoggedIn = false;

    try{
        await clickButton('#hf_title_signin_membership')
        await Page.loadEventFired();
    }
    catch{
        isLoggedIn = true;
    }

    if(isLoggedIn == false){
        const loginSucces = await Login()
        if(loginSucces == false){
            changeStatus("Login Failed, Exiting!")
            document.getElementById(id).childNodes[6].className = "TaskText fail w-52";
            await chrome.kill()
            return false;
        }
    }

    await Page.reload();
    await Page.loadEventFired();

    changeStatus("Fetching Session..")
    try{
        var expression = `localStorage.getItem('oidc.user:https://accounts.nike.com:4fd2d5e7db76e0f85a6bb56721bd51df')`;
        var { result } = await Runtime.evaluate({ expression });
        var value = JSON.parse(result.value);
        console.log(value)
        var userBearer = value.access_token
        var userProfileId = value.profile.sub
        var userName = value.profile.given_name + " " + value.profile.family_name
        var { root } = await DOM.getDocument();


        var { nodeId } = await DOM.querySelector({
                selector: "#nike-unite",
                nodeId: root.nodeId,
            });

        var attribs = await DOM.getAttributes({nodeId: nodeId})

        var nikeUxPos = 0
        
        for(let x = 0; x<attribs.attributes.length; x++){
            if(attribs.attributes[x] == "data-clientid"){
                nikeUxPos = x + 1
            }
        }

        var nikeUx = (attribs.attributes[nikeUxPos])

        var profileHeaders = {
            "authorization": `Bearer ${userBearer}`,
            "x-nike-ux-id": nikeUx,
            "User-Agent": "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        }
    }
    catch{
        changeStatus("Failed to Create Session!")
        await chrome.kill()
        return
    }

    const userId = (`https://api.nike.com/identity/user/v1/${userProfileId}/address`)

    const setProfleInfo = await addProfileInfo()
    if(setProfleInfo !== true){
        changeStatus(setProfleInfo)
        // await chrome.kill()
        return false;
    }

    await Page.close()
    const hook2 = new Webhook(WebhookURL.toString());
    const embed2 = new MessageBuilder()
                    .setTitle('Account Logged In Successfully')
                    .setAuthor('Your App Success', 'https://cdn.discordapp.com/app-icons/YOUR_DISCORD_CLIENT_ID_HERE/144696e166c1e574816e2432072e9e6b.png?size=256', 'https://www.google.com')
                    .addField('Account Email', accountEmail, false)
                    .addField('Account Name', userName, false)

                    .setColor('#997acc')
                    .setDescription('Your App Successfully logged into an account')

                    .setFooter("Your App")
                    .setTimestamp();
                    
    hook2.send(embed2);
    changeStatus("Logged In!")
    return true;




    async function addProfileInfo(){
        function makeRandom(amt) {
            var result = "";
            var characters =
                "cdefghijkl0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < amt; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            return result
        }

        changeStatus("Fetching Address..")

            try{
                const fetchAddress = (await axios.get(userId, {
                    headers: profileHeaders,
                    proxy: {
                            protocol: 'https',
                            host: server.split(":")[0],
                            port: server.split(":")[1],
                            auth: {
                                username: proxyuser,
                                password: proxypass
                            },
                        }
                })).data
        
                if (fetchAddress.length == 0) {
                    changeStatus("Adding Address..")
            
                    const addAddress = await axios.post(userId, {
                        'code': zip,
                        'country': 'US',
                        'line1': address,
                        'line2': address2,
                        'line3': '',
                        'locality': city,
                        'name': {
                            'kana': {
                                'family': '',
                                'given': ''
                            },
                            'primary': {
                                'family': last,
                                'given': first
                            }
                        },
                        'phone': {
                            'evening': '',
                            'primary': phone
                        },
                        'preferred': true,
                        'province': state,
                        'zone': ''
                    }, {
                        headers: profileHeaders,
                        proxy: {
                            protocol: 'https',
                            host: server.split(":")[0],
                            port: server.split(":")[1],
                            auth: {
                                username: proxyuser,
                                password: proxypass
                            },
                        }
                    })
            
                    changeStatus("Address Added!")
            
                } else {
                    changeStatus("Address Found!")
                }
            }
            catch{
                return("Failed to Fetch Address, Exiting..")
            }
            
            changeStatus("Fetching Payments..")

            try{

                var randomCard = makeRandom(8) + "-" + makeRandom(4) + "-" + makeRandom(4) + "-" + makeRandom(12)
        
            const fetchCardInfo = (await axios.post(
                'https://api.nike.com/commerce/storedpayments/consumer/storedpayments',
                {}, {
                    headers: {
                        'host': 'api.nike.com',
                        'connection': 'keep-alive',
                        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="111", "Chromium";v="111"',
                        'accept': 'application/json',
                        'authorization': `Bearer ${userBearer}`,
                        'sec-ch-ua-mobile': '?0',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                        'sec-ch-ua-platform': '"Windows"',
                        'origin': 'https://www.nike.com',
                        'sec-fetch-site': 'same-site',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-dest': 'empty',
                        'referer': 'https://www.nike.com/',
                        'accept-language': 'en-US,en;q=0.9,fr;q=0.8,de;q=0.7',
                    },
                    proxy: {
                        protocol: 'https',
                        host: server.split(":")[0],
                        port: server.split(":")[1],
                        auth: {
                            username: proxyuser,
                            password: proxypass
                        },
                    }
                }
            )).data;
        
            if (!("payments" in fetchCardInfo)) {
                changeStatus("Adding Card [0]")
        
                const storeCard = await axios.post(`https://paymentcc.nike.com/creditcardsubmit/${randomCard}/store`, {
                    'accountNumber': card,
                    'cardType': (revealCard(card)).toUpperCase(),
                    'expirationMonth': expiration.split("/")[0],
                    'expirationYear': `20${expiration.split("/")[1]}`,
                    'creditCardInfoId': randomCard,
                    'cvNumber': cvv
                }, {
                    headers: {
                        "User-Agent": "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
                        "sec-ch-ua-platform": "Windows",
                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"111\", \"Google Chrome\";v=\"111\"",
                    },
                    proxy: {
                        protocol: 'https',
                        host: server.split(":")[0],
                        port: server.split(":")[1],
                        auth: {
                            username: proxyuser,
                            password: proxypass
                        },
                    }
                })
                changeStatus("Adding Card [1]")
        
                const saveCard = await axios.post('https://api.nike.com/commerce/storedpayments/consumer/savepayment', {
                    'type': 'CreditCard',
                    'creditCardInfoId': randomCard,
                    'isDefault': true,
                    'currency': 'USD',
                    'billingAddress': {
                        'address1': address,
                        'address2': address2,
                        'city': city,
                        'country': 'US',
                        'firstName': first,
                        'lastName': last,
                        'postalCode': zip,
                        'state': state
                    }
                }, {
                    headers: profileHeaders,
                    proxy: {
                        protocol: 'https',
                        host: server.split(":")[0],
                        port: server.split(":")[1],
                        auth: {
                            username: proxyuser,
                            password: proxypass
                        },
                    }
                })
        
                if (saveCard.data.status == 'success') {
                    changeStatus("Added Card!")
                }
            } else {
                changeStatus("Card Already Added!")
            }

            }
            catch{
                return("Failed to Add Billing, Exiting..")
            }

            return true;
    }

    async function Login(){
        await clickButton('#root > div > div > div > div > form > div > div.css-1cuic7g > button')
        await delay(1500)
        await clickButton('#username')
        await typeText(accountEmail)
        await clickButton('#root > div > div > div > div > form > div > div.css-1cuic7g > button')
        while(emailStatus == 0){
            await delay(500)
            console.log("Waiting for email response")
        }
        if(emailStatus !== 200){
            if(emailStatus == 428){
                changeStatus("Waiting 28s..")
                await delay(28000)
        
                await clickButton('#root > div > div > div > div > form > div > div.css-1cuic7g > button')
        
                while(emailStatus == 428){
                    await delay(500)
                    console.log("Waiting for email response")
                }
            }
            else{
                changeStatus("Error Entering Email!")
                document.getElementById(id).childNodes[6].className = "TaskText fail w-52";
                await chrome.kill()
                return false;
            }
        }
        
        await delay(200)
        await clickButton('#password')
        await typeText(accountPass)

        await clickButton('#root > div > div > div > div.css-1qzlyy1 > form > div > div.css-1028qb5 > button')

        while(passwordStatus == 0){
            await delay(500)
            console.log("Waiting for password response")
        }
        if(passwordStatus !== 200){

            if(passwordStatus == 428){
                changeStatus("Waiting 28s..")
                await delay(28000)
        
                await clickButton('#root > div > div > div > div.css-1qzlyy1 > form > div > div.css-1028qb5 > button')
        
                while(passwordStatus == 428){
                    await delay(500)
                    console.log("Waiting for email response")
                }
            }
            else{
                changeStatus("Error Entering Password!")
                document.getElementById(id).childNodes[6].className = "TaskText fail w-52";
                await chrome.kill()
                return false;
            }
        }
        await delay(5000);
        return true;
    }



    async function changeStatus(status) {
        document.getElementById(id + "stop").onclick = async function () {
            document.getElementById(id + "status").innerText = "Stopped";
            document.getElementById(id + "status").className = "TaskText w-52";
            document.getElementById(id + "stop").style.visibility = "hidden";
            document.getElementById(id + "start").style.visibility = "visible";
      
            await Page.close();
            return true;
          };
          if (document.getElementById(id)) {
            document.getElementById(id + "status").innerText = status;
      
          }
        }
}