import getAppDataPath from "../modules/fetchPath";
const fs = window.require("fs");
const path = window.require("path");

export default class Data {
  taskData() {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(getAppDataPath(), "Tasks.json"))
      );
    } catch {
      fs.writeFileSync(
        path.join(getAppDataPath(), "Tasks.json"),
        "[]"
      );
      return [];
    }
  }
  webhook() {
    try {
        return (fs.readFileSync(path.join(getAppDataPath(), "Webhook")))
    } catch {
      fs.writeFileSync(
        path.join(getAppDataPath(), "Webhook"),
        ""
      );
      return "";
    }
  }
  taskGroups() {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(getAppDataPath(), "TaskGroups.json"))
      );
    } catch {
      fs.writeFileSync(
        path.join(getAppDataPath(), "TaskGroups.json"),
        JSON.stringify([])
      );
      return [];
    }
  }
  profileData() {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(getAppDataPath(), "ProfileData.json"))
      );
    } catch {
      fs.writeFileSync(
        path.join(getAppDataPath(), "ProfileData.json"),
        JSON.stringify([])
      );
      return [];
    }
  }
  profileGroups() {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(getAppDataPath(), "ProfileGroups.json"))
      );
    } catch {
      fs.writeFileSync(
        path.join(getAppDataPath(), "ProfileGroups.json"),
        JSON.stringify([])
      );
      return [];
    }
  }
  proxyData() {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(getAppDataPath(), "Proxies.json"))
      );
    } catch {
      fs.writeFileSync(
        path.join(getAppDataPath(), "Proxies.json"),
        JSON.stringify([])
      );
      return [];
    }
  }
  accountData() {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(getAppDataPath(), "Accounts.json"))
      );
    } catch {
      fs.writeFileSync(
        path.join(getAppDataPath(), "Accounts.json"),
        JSON.stringify([])
      );
      return [];
    }
  }

  setTaskData(data) {
    fs.writeFileSync(path.join(getAppDataPath(), "Tasks.json"), JSON.stringify(data),
    function (err) {
      if (err) throw err;
    });
  }
    setTaskGroups(data) {
        fs.writeFileSync(path.join(getAppDataPath(), "TaskGroups.json"), JSON.stringify(data), function (err) {
            if (err) throw err;
        })
        console.log(data)
    }
    setProfileData(data) {
        fs.writeFileSync(path.join(getAppDataPath(), "ProfileData.json"), JSON.stringify(data), function (err) {
            if (err) throw err;
        })
    }
    setProfileGroups(data) {
        fs.writeFileSync(path.join(getAppDataPath(), "ProfileGroups.json"), JSON.stringify(data), function (err) {
            if (err) throw err;
        })
    }
    setProxyData(data) {
        fs.writeFileSync(path.join(getAppDataPath(), "Proxies.json"), JSON.stringify(data), function (err) {
            if (err) throw err;
        })
    }
    setAccountData(data) {
        fs.writeFileSync(path.join(getAppDataPath(), "Accounts.json"), JSON.stringify(data), function (err) {
            if (err) throw err;
        })
    }
    setWebhook(data) {
      fs.writeFileSync(path.join(getAppDataPath(), "Webhook"), (data), function (err) {
          if (err) throw err;
      })
  }
}
