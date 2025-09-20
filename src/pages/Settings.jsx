import React, { useState } from "react";
import colors, { red } from "tailwindcss/colors";
import Clock from "react-live-clock";
import * as fa from "react-icons/fa";
import { themeChange } from 'theme-change'
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  ShoppingBagIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  TrashIcon,
  BookmarkSquareIcon,
} from "@heroicons/react/20/solid";
import { toast, Toaster } from "react-hot-toast";
import Data from "../modules/dataExports";
const { Webhook, MessageBuilder } = window.require("discord-webhook-node");
// import { TaskGroups } fro./TaskGroups.jsonups";
const os = window.require("os");
const userHomeDir = os.homedir();
const fetch = window.require("node-fetch2");
const fs = window.require("fs");

const globalData = new Data()
const WebhookURL = globalData.webhook()

if (fs.existsSync(userHomeDir + "\\AppData\\Roaming\\your-app-name\\TextKey")) {
  // ...
} else {
  fs.writeFile(
    userHomeDir + "\\AppData\\Roaming\\your-app-name\\TextKey",
    "",
    function (err) {
      if (err) throw err;
    }
  );
}

if (
  fs.existsSync(userHomeDir + "\\AppData\\Roaming\\your-app-name\\ImapAccounts.json")
) {
  // ...
} else {
  fs.writeFile(
    userHomeDir + "\\AppData\\Roaming\\your-app-name\\ImapAccounts.json",
    "[]",
    function (err) {
      if (err) throw err;
    }
  );
}
var ImapAccounts = JSON.parse(
  fs.readFileSync(
    userHomeDir + "\\AppData\\Roaming\\your-app-name\\ImapAccounts.json"
  )
);

var imaptxt = "";
ImapAccounts.forEach((element) => {
  imaptxt += element.email + ":" + element.password + "\n";
});

var TextKey = fs.readFileSync(
  userHomeDir + "\\AppData\\Roaming\\your-app-name\\TextKey"
);
const saveAccounts = (e) => {
  e.preventDefault();
  const accs = e.target.value;
  toast.success("Saved IMAP Accounts!", {
    style: {
      borderRadius: "10px",
      background: "#292938",
      color: "#fff",
    },
  });
  ImapAccounts = [];
  accs.split("\n").forEach((element) => {
    console.log("element: " + element);
    if (element.split(":")[0] != "" && element.split(":")[1] != "") {
      ImapAccounts.push({
        email: element.split(":")[0],
        password: element.split(":")[1],
      });
    }
  });
  fs.writeFileSync(
    userHomeDir + "\\AppData\\Roaming\\your-app-name\\ImapAccounts.json",
    JSON.stringify(ImapAccounts)
  );
};
class Settings extends React.Component {
  componentDidMount() {}
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    function closeApp() {
      window.close();
    }

    const save = (event) => {
      if (
        event.target.parentNode.parentNode.childNodes[2].value != WebhookURL
      ) {
        globalData.setWebhook( event.target.parentNode.parentNode.childNodes[2].value);
      }
    };

    const savekey = (event) => {
      if (event.target.parentNode.parentNode.childNodes[2].value != TextKey) {
        TextKey = event.target.parentNode.parentNode.childNodes[2].value;
        fs.writeFile(
          userHomeDir + "\\AppData\\Roaming\\your-app-name\\TextKey",
          TextKey,
          function (err) {
            if (err) throw err;
          }
        );
      }
    };
    return (
      <>
        <Toaster position="bottom-right"></Toaster>
        <div className="mainHolder w-10/12">
          <div className="w-full mt-2 ml-2 rounded-sm h-[88%]">
            <div>
              <h1 className="font-medium mt-5 absolute text-xl ml-5">
                Webhooks
              </h1>
              <h2 className="font-medium mt-14 absolute text-sm ml-5 brightness-75">
                General
              </h2>
              <input
                id="input"
                defaultValue={WebhookURL}
                className="w-10/12  font-medium text-center text-xs placeholder-secText ml-5 bg-gray-1000 rounded-lg outline-none border-none h-8 mt-[5.5rem]"
              ></input>
              <button onClick={save}>
                <fa.FaCheck className="fill-white ml-5"></fa.FaCheck>
              </button>
            </div>

            <div>
              <h1 className="font-medium mt-5 absolute text-xl ml-5 ">
                Mobile Verification
              </h1>
              <h2 className="font-medium mt-14 absolute text-sm ml-5 brightness-75">
                TextVerified
              </h2>
              <input
                id="input"
                defaultValue={TextKey}
                className="w-10/12  font-medium text-center text-xs placeholder-secText ml-5 bg-gray-1000 rounded-lg outline-none border-none h-8 mt-[5.5rem]"
              ></input>
              <button onClick={savekey}>
                <fa.FaCheck className="fill-white ml-5" />
              </button>
            </div>


            <h1 className="font-medium mt-5 text-xl ml-5 ">
              IMAP Accounts
            </h1>
            <h2 className="font-medium mt-2 text-sm ml-5 brightness-75">
              Update Accounts
            </h2>
            <textarea
              onBlur={saveAccounts}
              defaultValue={imaptxt}
              placeholder="email:imappassword"
              className="ml-5 mt-2 text-xs p-2  placeholder-secText bg-gray-100 rounded-sm outline-none border-none focus:bg-gray-1000 resize-none w-1/4 h-36 transition-all duration-1000"
              name=""
              rows={5}
              cols={5}
              id=""
            ></textarea>

<select data-choose-theme>
  <option value="night">Default</option>
  <option value="dark">Dark</option>
  <option value="coffee">Coffee</option>
  <option value="business">Business</option>
  <option value="garden">Garden</option>


</select>

            
          </div>
        </div>
      </>
    );
  }
}

export default Settings;
