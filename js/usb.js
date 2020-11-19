(function(window, navigator) {
  "use strict";
  var USBWrapperInit = function() {
    var UsbWrapper = new function() {
      this.hasUSB = navigator && navigator.usb;
      if (!this.hasUSB) {
        console.log('Your browser does not support usb')
        return;
      }
      this.connect = () => {
        return navigator.usb
        .requestDevice({filters: []})
        .catch(e => {
          console.log(e);
          return null;
        });
      };
      this.usb = navigator.usb;
    };
    window.USBWrapper = UsbWrapper;
  };
  window.USBWrapperInit = USBWrapperInit;
})(window, navigator);