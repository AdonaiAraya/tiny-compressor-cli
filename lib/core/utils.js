var fs = require("fs");
var fspath = require("path");
var url = require("url");
var messenger = require("./messenger");

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
    return validExtensions.indexOf(fspath.extname(path)) != -1;
};

utils.isFile = function (path) {
    var pathInfo = fs.statSync(path);
    return pathInfo.isFile();
};

utils.isDirectory = function (path) {
    var pathInfo = fs.statSync(path);
    return pathInfo.isDirectory();
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