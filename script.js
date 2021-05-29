

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

function getTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "darkmode"
    } else {
        return "whitemode"
    }
}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
} 

function plateforme() {
    if (detectMob()) {
        return "mobile";
     } else {
         return "pc";
     }
}


navigator.getBattery().then(function(battery) {

    var charging = battery.charging;

    document.querySelector('.charging').textContent = charging ;
});




let Data = {
    gpu: getVideoCardInfo()["renderer"],
    screenX: window.screen.height,
    screenY: window.screen.width,
    browser: detectBrowser(),
    touchScreen: is_touch_device(),
    userAgent: window.navigator.userAgent,
    theme: getTheme(),
    plateforme: window.navigator.platform,
    langue: window.navigator.language,
}




connexionInfo = navigator.connection.downlink

console.log(connexionInfo)

const gpu = document.querySelector('.gpu').textContent = Data.gpu;
const browser = document.querySelector('.browser').textContent = Data.browser;
const screenUser = document.querySelector('.screen').textContent = `${Data.screenX} / ${Data.screenY}`;
const plate = document.querySelector(".plateforme").textContent =  Data.plateforme;
const langue = document.querySelector(".langue").textContent = Data.langue;
const tactile = document.querySelector(".tactile").textContent = Data.touchScreen;
const Theme = document.querySelector(".theme").textContent = Data.theme;
const downspeed = document.querySelector(".downspeed").textContent = connexionInfo + ' Mb/S';



