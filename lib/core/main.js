var api = require("./api");
var utils = require("./utils");
var config = require("./config.json");

var tc = {};

tc.compress = function (path, key) {
    var pathIsValid = utils.validatePath(path);
    if(pathIsValid.isValid){
        var images = [];
        if(utils.isFile(path)){
            if(utils.isImage(path)){
                images.push(path);
            }
            else {
                //TODO: messenger
                //TODO: The file must be a valid image (PNG or JPG)
                utils.printer("The file must be a valid image (PNG or JPG)", "error");
            }
        }
        else if(utils.isDirectory(path)) {
            images.push.apply(images, utils.getImagesFromDirectory(path));

            if(!images.length){
                utils.printer("The directory does not have any images", "error");
            }
        }

        var compressDirectory = utils.createDirectory(path, config.COMPRESS_FOLDER_NAME);
        if(compressDirectory){
            for(var c = 0; c < images.length; c++){
                var image = images[c];
                api.compressImage(key, image).then(
                    function (response) {
                        api.getCompressedImage(response.path, compressDirectory, response.location).then(
                            function(success){
                                utils.printer(utils.getFileName(success.path) + " has been compressed sucesfully, " + (success.saved / 1024).toFixed(2) + " KB saved", "success");
                            },
                            function(error){
                                utils.printer(error.messenger.text, "error");
                            },
                            function (progress) {}
                        );
                    },
                    function (error) {
                        utils.printer(error.messenger.text, "error");
                    },
                    function (progress) {}
                );
            }
        }
        else {
            utils.printer("Can't create compress directory", "error");
        }
    }
    else {
        utils.printer(pathIsValid.text, "error");
    }
};

tc.status = function (key) {
    api.getCompressionCount(key).then(
        function (compressionCount) {
            utils.printer("You have made " + (compressionCount.green) + " compressions this month");
        },
        function (error) {
            utils.printer(error.messenger.text, "error");
        }
    );
};

tc.key = function (key) {
    var mainDir = utils.getMainDirectoryPath();
    var userConfigDirPath = utils.findOrCreateDir(mainDir, config.USER_CONFIG_DIR_NAME);
    var userConfigFilePath = utils.findOrCreateFile(userConfigDirPath, config.USER_CONFIG_FILE_NAME, JSON.stringify({}));

    var userConfig = JSON.parse(utils.readFile(userConfigFilePath));
    userConfig.key = key;
    utils.writeFile(userConfigFilePath, JSON.stringify(userConfig));

    utils.printer("The API_KEY was saved successfully!", "success");
};

module.exports = tc;