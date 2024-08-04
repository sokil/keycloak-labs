/**
 * Used with JetBrains HTTP Client on OAuth authenticate requests to log
 * unpacked fetched OAuth2  access token and its details
 */
function atob(data) {
    if (arguments.length === 0) {
        throw new TypeError("1 argument required, but only 0 present.");
    }
    data = `${data}`;
    data = data.replace(/[ \t\n\f\r]/g, "");
    if (data.length % 4 === 0) {
        data = data.replace(/==?$/, "");
    }
    if (data.length % 4 === 1 || /[^+/0-9A-Za-z]/.test(data)) {
        return null;
    }
    var atobLookup = function (chr) {
        const index = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(chr);
        return index < 0 ? undefined : index;
    };
    var output = "";
    var buffer = 0;
    var accumulatedBits = 0;
    for (var i = 0; i < data.length; i++) {
        buffer <<= 6;
        buffer |= atobLookup(data[i]);
        accumulatedBits += 6;
        if (accumulatedBits === 24) {
            output += String.fromCharCode((buffer & 0xff0000) >> 16);
            output += String.fromCharCode((buffer & 0xff00) >> 8);
            output += String.fromCharCode(buffer & 0xff);
            buffer = accumulatedBits = 0;
        }
    }
    if (accumulatedBits === 12) {
        buffer >>= 4;
        output += String.fromCharCode(buffer);
    } else if (accumulatedBits === 18) {
        buffer >>= 2;
        output += String.fromCharCode((buffer & 0xff00) >> 8);
        output += String.fromCharCode(buffer & 0xff);
    }
    return output;
}

// store access token to state
client.global.set("access_token", response.body.access_token);
client.global.set("refresh_token", response.body.refresh_token);

// prent decoded JWT
const decodedJWT = response.body.access_token
    .split(".")
    .slice(0,2)
    .map(chunk => JSON.parse(atob(chunk)));

client.log("\nHeader: " + JSON.stringify(decodedJWT[0], null, 4));
client.log("\nBody: " + JSON.stringify(decodedJWT[1], null, 4));

client.log("\nExpired at: " + (new Date(1000 * decodedJWT[1]["exp"])))
client.log("\nExpired after seconds: " + ~~(decodedJWT[1]["exp"] - Date.now() / 1000));

