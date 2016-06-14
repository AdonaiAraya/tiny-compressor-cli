var fs = require("fs");
var fspath = require("path");
var url = require("url");
var messenger = require("./messenger");
var config = require("./config.json");

var utils = {};

var validExtensions = [".jpg", ".jpeg", ".png"];

utils.printer = function (str, type) {
    if(type === "error"){
        console.log(str.red);
    }
    else if(type === "warning"){
        console.log(str.yellow);
    }
    else if(type === "success"){
        console.log(str.green);
    }
    else {
        console.log(str);
    }
};

utils.validatePath = function (path) {
    try {
        var pathInfo = fs.statSync(path);
        if(pathInfo.isFile() || pathInfo.isDirectory()){
            return messenger.ok();
        }
        else {
            return messenger.error("The path must be a file or a directory");
        }
    }
    catch (exception){
        if(exception.code = "ENOENT"){
            return messenger.error("No such file or directory: " + exception.path);
        }
        else {
            return messenger.error("Error, unknown error reading the image");
        }
    }
};

utils.getImagesFromDirectory = function (path) {
    var images = [];
    var files = fs.readdirSync(path);

    for(var c = 0; c < files.length; c++){
        var file = fspath.join(path, files[c]);
        if(this.isImage(file)){
            images.push(file);
        }
    }

    return images;
};

utils.isImage = function (path) {
    //TODO: Check file mimetype by buffer mime type not by extension
    return validExtensions.indexOf(fspath.extname(path).toLowerCase()) != -1;
};

utils.isFile = function (path) {
    var pathInfo = fs.statSync(path);
    return pathInfo.isFile();
};

utils.isDirectory = function (path) {
    var pathInfo = fs.statSync(path);
    return pathInfo.isDirectory();
};

utils.getMainDirectoryPath = function () {
    return fspath.dirname(fspath.dirname(require.main.filename));
};

utils.findOrCreateDir = function (path, dir) {
    var path = fspath.join(path, dir);

    try {
        if (!utils.isDirectory(path)){
            fs.mkdirSync(path);
        }
    }
    catch (exception){
        if(exception.code = "ENOENT"){
            fs.mkdirSync(path);
        }
    }

    return path;
};

utils.findOrCreateFile = function (path, file, data) {
    var path = fspath.join(path, file);

    try {
        if (!utils.isFile(path)){
            fs.writeFileSync(path, data, {
                encoding: "utf8"
            });
        }
    }
    catch (exception){
        if(exception.code = "ENOENT"){
            fs.writeFileSync(path, data, {
                encoding: "utf8"
            });
        }
    }

    return path;
};

utils.readFile = function (path) {
    return fs.readFileSync(path, {
        encoding: "utf8"
    });
};

utils.writeFile = function (path, data) {
    fs.writeFileSync(path, data, {
        encoding: "utf8"
    });
};

utils.getApiKey = function () {
    var mainDir = utils.getMainDirectoryPath();
    var path = fspath.join(mainDir, config.USER_CONFIG_DIR_NAME, config.USER_CONFIG_FILE_NAME);
    var key = "";

    try {
        var configFile = JSON.parse(this.readFile(path));
        key = configFile.key;
    }
    catch(e){}

    return key;
};

utils.createDirectory = function (path, dir) {
    var parentDir = "";
    if(this.isFile(path)) parentDir = fspath.dirname(path);
    else parentDir = path;

    var newDir = fspath.join(parentDir, dir);
    try{
        fs.mkdirSync(newDir);
        return newDir;
    }
    catch (exception){
        if(exception.code == "EEXIST"){
            return newDir;
        }
        else {
            return false;
        }
    }
};

utils.joinDirAndFile = function (dir, path) {
    var filenameWithExtension = fspath.basename(path);
    return fspath.join(dir, filenameWithExtension);
};

utils.getFileName = function (path) {
    return fspath.basename(path);
};

utils.getFileSize = function (path) {
    var pathInfo = fs.statSync(path);
    return pathInfo.size;
};

utils.parseURL = function(dest) {
    return url.parse(dest);
};

module.exports = utils;