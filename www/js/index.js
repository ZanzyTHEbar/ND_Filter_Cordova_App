var lux_level = 0;
var recommendation_text = "";
const ldrLookupTable = [
    0.0,
    10.9,
    11.0,
    50.9,
    51.0,
    200.9,
    201.0,
    400.9,
    401.0,
    1000.9,
    1001.0,
    5000.9,
    5001.0,
    10000.9,
    10001.0,
    30000.9,
    30001.0,
    100000.9,
    100001.0,
    110000.9,
    111000.0,
    120000.9,
    121000.0,
    300000.9,
    300001.0,
    1000000.9,
]

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function content(divSelector, value) {
    document.querySelector(divSelector).innerHTML = value;
}

async function grabData() {
    window.plugin.lightsensor.watchReadings(
        function success(reading) {
            // Output: {"intensity": 25}
            //console.log(JSON.stringify(reading));
            lux_level = reading.intensity;
        },
        function error(message) {
            console.log(message);
        }
    );
}

async function checkLuxState() {
    if (lux_level <= 0) {
        recommendation_text = "No Filter";
        alert("It is dark in here. Please turn on the light.");
    }
    else if (lux_level >= ldrLookupTable[0] && lux_level <= ldrLookupTable[1]) {
        recommendation_text = "No Filter";
    }
    else if (lux_level >= ldrLookupTable[2] && lux_level <= ldrLookupTable[3]) {
        recommendation_text = "No Filter";
    }
    else if (lux_level >= ldrLookupTable[4] && lux_level <= ldrLookupTable[5]) {
        recommendation_text = "No Filter";
    }
    else if (lux_level >= ldrLookupTable[6] && lux_level <= ldrLookupTable[7]) {
        recommendation_text = "ND4";
    }
    else if (lux_level >= ldrLookupTable[8] && lux_level <= ldrLookupTable[9]) {
        recommendation_text = "ND4";
    }
    else if (lux_level >= ldrLookupTable[10] && lux_level <= ldrLookupTable[11]) {
        recommendation_text = "ND4";
    }
    else if (lux_level >= ldrLookupTable[12] && lux_level <= ldrLookupTable[13]) {
        recommendation_text = "ND8";
    }
    else if (lux_level >= ldrLookupTable[14] && lux_level <= ldrLookupTable[15]) {
        recommendation_text = "ND8";
    }
    else if (lux_level >= ldrLookupTable[16] && lux_level <= ldrLookupTable[17]) {
        recommendation_text = "ND8";
    }
    else if (lux_level >= ldrLookupTable[18] && lux_level <= ldrLookupTable[19]) {
        recommendation_text = "ND16";
    }
    else if (lux_level >= ldrLookupTable[20] && lux_level <= ldrLookupTable[21]) {
        recommendation_text = "ND16";
    }
    else if (lux_level >= ldrLookupTable[22] && lux_level <= ldrLookupTable[23]) {
        recommendation_text = "ND16 or ND32";
    }
    else if (lux_level >= ldrLookupTable[24] && lux_level <= ldrLookupTable[25]) {
        recommendation_text = "ND32";
    }
    else {
        recommendation_text = "ND32 or ND64";
        alert("The sun is too bright for the ND32 filter. Please use the ND64 filter.");
    }
}

window.setInterval(grabData, 100);
window.setInterval(checkLuxState, 200);
window.setInterval(function () {
    content("#rec_text", recommendation_text);
    content("#lux_text", lux_level);
}, 300);
