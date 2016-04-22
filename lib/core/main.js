var fs = require("fs");
var https = require("https");
var config = require("./config.json");

var tc = {};

var encodeAuthentication = function (key) {
    return new Buffer(config.AUTHENTICATION_PREFIX + key).toString("base64");
};

tc.compress = function (path, key) {
    //TODO: Compress images
};

tc.checkKeyStatus = function (key) {
    var request = https.request({
        host: config.API_ENDPOINT,
        method: "POST",
        path: "/shrink",
        headers: {
            Authorization: "Basic " + encodeAuthentication(key)
        }
    }, function (response) {
        if(response && response.headers && response.headers["compression-count"]){
            console.log("You have made " + ((response.headers["compression-count"]).green) + " compressions this month");
        }
        else {
            //TODO: Error, no compression-count headers was present
        }
    });

    request.end();

    request.on("error", function (error) {
        //TODO: Error sending request
    })
};

module.exports = tc;