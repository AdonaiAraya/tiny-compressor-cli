var fs = require("fs");
var fspath = require("path");
var url = require("url");
var Q = require("q");

var utils = {};

var validExtensions = [".jpg", ".jpeg", ".png"];

utils.validatePath = function (path) {
    try {
        var pathInfo = fs.statSync(path);
        if(pathInfo.isFile() || pathInfo.isDirectory()){
            return true;
        }
        else {
            //TODO: messenger
            return "The path must be a file or a directory";
        }
    }
    catch (exception){
        if(exception.code = "ENOENT"){
            //TODO: messenger
            return "No such file or directory: " + exception.path;
        }
        else {
            //TODO: messenger
            return "Error, unknown error reading the image";
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