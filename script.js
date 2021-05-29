/**
 * A very simple method to retrieve the name of the default videocard of the system
 * using webgl.
 * 
 * @returns {Object}
 */
function getVideoCardInfo() {
    const gl = document.createElement('canvas').getContext('webgl');

    if (!gl) {
        return {
            error: "no webgl",
        };
    }
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

    if(debugInfo){
        return {
            vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
            renderer:  gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
        };
    }

    return {
        error: "no WEBGL_debug_renderer_info",
    };
}

//gets the type of browser
function detectBrowser() { 
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
        return 'Opera';
    } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
        return 'Chrome';
    } else if(navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ){
        return 'Firefox';
    } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        return 'IE';//crap
    } else {
        return 'Unknown';
    }
} 

function is_touch_device() {  
    try {  
      document.createEvent("TouchEvent");  
      return true;  
    } catch (e) {  
      return false;  
    }  
}

function getBattery(){
    navigator.getBattery().then(function(battery) {

        return battery.level;
    });
}

function getWindows(){
    try {
        window.navigator.appVersion.split("NT")[1].split(";")[0].trim()
    } catch (e) {
        return false;
    }
} 

function getTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "darkmode"
    } else {
        return "whitemode"
    }
}




let Data = {
    gpu: getVideoCardInfo()["renderer"],
    screenX: window.screen.height,
    screenY: window.screen.width,
    browser: detectBrowser(),
    windowsVersion: getWindows(),
    touchScreen: is_touch_device(),
    battery: getBattery(),
    userAgent: window.navigator.userAgent,
    theme: getTheme()
}
console.log(Data);