const fs = window.require('fs');
const path = window.require('path');

function getAppDataPath() {
    let appDatatDirPath = ''
    switch (process.platform) {
      case "darwin": {
        appDatatDirPath = path.join(window.process.env.HOME, "Library", "Application Support", "your-app-name");
        break;
    }
      case "win32": {
        appDatatDirPath = path.join(window.process.env.APPDATA, "your-app-name");
        break;
      }
      case "linux": {
        appDatatDirPath = path.join(window.process.env.HOME, "your-app-name");
        break;
      }
      default: {
        console.log("Unsupported platform!");
        process.exit(1);
      }
    }

    // Create appDataDir if not exist
    if (!fs.existsSync(appDatatDirPath)) {
        fs.mkdirSync(appDatatDirPath);
    }

    return appDatatDirPath

  }

  module.exports = getAppDataPath