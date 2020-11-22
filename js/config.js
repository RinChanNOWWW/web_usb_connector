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
        log.innerHTML = "USB CONFIG TEST<br/>";
    }
    class Config {
        constructor() {
            genLog("USB CONFIG TEST");
            this.inputA = '';
            this.inputB = '';
        }

        connect(selectedDevice) {
            console.log(selectedDevice);
            device = selectedDevice;
            genLog("Opening Device...");
            return device.open()
            .then(() => {
                genLog(`${device.productName}(${device.manufacturerName}) connected.`);
                document.getElementById("inputs").classList.remove("hidden");
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
                genLog('Device closed.');
                document.getElementById("inputs").classList.add("hidden");
                this.clearConfig();
            })
        }

        clearConfig() {
            this.inputA = '';
            this.inputB = '';
            document.getElementById("inputA").value = this.inputA;
            document.getElementById("inputB").value = this.inputB;
        }

        setAB() {
            if (!device || !device.opened) {
                return Promise.reject("Device not opened");
            }
            this.inputA = document.getElementById("inputA").value;
            this.inputB = document.getElementById("inputB").value;
            if (this.inputA === '' || this.inputB === '') {
                genLog('Please input something')
                return;
            }
            const log = `inputA: ${this.inputA}, inputB: ${this.inputB}`;
            genLog(log);
        }
    };
    window.Config = Config;
    window.genLog = genLog;
    window.clearLog = clearLog;
})(window, document);