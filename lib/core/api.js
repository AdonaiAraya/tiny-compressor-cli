var https = require("https");
var fs = require("fs");
var Q = require("q");
var config = require("./config.json");
var utils = require("./utils");
var messenger = require("./messenger");

var api = {};

var encodeAuthentication = function (key) {
    return new Buffer(config.AUTHENTICATION_PREFIX + key).toString("base64");
};

api.compressImage = function (key, path) {
    var deferred = Q.defer();

    var request = https.request({
        host: config.API_ENDPOINT,
        method: "POST",
        path: "/shrink",
        headers: {
            Authorization: "Basic " + encodeAuthentication(key)
        }
    }, function (response) {
        var responseBody = "";
        
        response.on("data", function (chunk) {
            responseBody += chunk;
        });
        
        response.on("end", function () {
            if(response && response.headers && response.headers.location){
                deferred.resolve({
                    path: path,
                    location: response.headers.location
                });
            }
            else {
                if(responseBody){
                    var responseBodyParsed = JSON.parse(responseBody);
                    deferred.reject({
                        messenger: messenger.error(responseBodyParsed.message)
                    });
                }
                else {
                    deferred.reject({
                        messenger: messenger.error("Unknown error")
                    });
                }
            }
        });
    });

    var stream = fs.createReadStream(path)
    stream.pipe(request);

    stream.on("data", function (chunk) {
        deferred.notify(chunk.length);
    });

    stream.on("error", function (error) {
        deferred.reject({
            messenger: messenger.error("Can't connect to the server")
        });
    });

    return deferred.promise;
};

api.getCompressedImage = function (originalPath, destPath, location) {
    var deferred = Q.defer();

    var compressedPath = utils.joinDirAndFile(destPath, originalPath);

    var request = https.get(location, function (response) {
        var stream = fs.createWriteStream(compressedPath);
        response.pipe(stream);

        response.on("data", function (chunk) {
            deferred.notify(chunk.length);
        });

        response.on("error", function (error) {
            deferred.reject({
                path: originalPath,
                error: error
            });
        });

        response.on("end", function (error) {
            deferred.resolve({
                path: originalPath,
                saved: Math.abs(utils.getFileSize(originalPath) - response.headers["content-length"])
            });
        });
    });

    return deferred.promise;
};

api.getCompressionCount = function (key) {
    var deferred = Q.defer();

    var request = https.request({
        host: config.API_ENDPOINT,
        method: "POST",
        path: "/shrink",
        headers: {
            Authorization: "Basic " + encodeAuthentication(key)
        }
    }, function (response) {
        if(response && response.headers && response.headers["compression-count"]){
            deferred.resolve(response.headers["compression-count"]);
        }
        else {
            deferred.reject({
                messenger: messenger.error("Can't retrieve compression count. API key incorrect.")
            });
        }
    });

    request.end();

    request.on("error", function (error) {
        deferred.reject({
            messenger: messenger.error("Can't connect to the server")
        });
    });

    return deferred.promise;
};

module.exports = api;