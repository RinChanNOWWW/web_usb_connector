(function(window, document) {
    "use strict";
    var device;
    const genLog = function(html) {
        var log = document.getElementById('log');
        log.innerHTML += html + '<br/>';
        log.scrollTop = log.scrollHeight;
    }
    const clearLog = function() {
        var log = document.getElementById('log');
        log.innerHTML = "USB CONFIG TEST"
    }
    class Config {
        constructor() {
            genLog("USB CONFIG TEST")
        }

        connect(selectedDevice) {
            console.log(selectedDevice);
            device = selectedDevice;
            genLog("Opening Device...");
            return device.open()
            .then(() => {
                genLog(`${device.productName}(${device.manufacturerName}) connected.`)
            })
            .catch(err => {
                genLog(err);
                if (device && device.opened) {
                    device.close();
                }
            })
        }

        newConnection() {
            return window.USBWrapper.connect()
            .then(device => {
                if (!device) {
                    return Promise.reject("No device selected");
                }
                this.connect(device);
            })
        }

        close() {
            if (!device || !device.opened) {
                return Promise.reject("Device not opened");
            }
            genLog("Closing Device...");
            return device.close()
            .then(() => {
                genLog('Device closed.')
            })
        }
    };
    window.Config = Config;
    window.genLog = genLog;
    window.clearLog = clearLog;
})(window, document);