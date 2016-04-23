var api = require("./api");
var utils = require("./utils");
var config = require("./config.json");

var tc = {};

tc.compress = function (path, key) {
    var pathIsValid = utils.validatePath(path);
    if(pathIsValid === true){
        var images = [];
        if(utils.isFile(path)){
            if(utils.isImage(path)){
                images.push(path);
            }
            else {
                //TODO: messenger
                //TODO: The file must be a valid image (PNG or JPG)
                console.error("The file must be a valid image (PNG or JPG)".red);
            }
        }
        else if(utils.isDirectory(path)) {
            images.push.apply(images, utils.getImagesFromDirectory(path));

            if(!images.length){
                console.error("The directory does not have any images".red);
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
                                console.log((utils.getFileName(success.path) + " has been compressed sucesfully, " + (success.saved / 1024).toFixed(2) + " KB saved").green);
                            },
                            function(error){
                                console.error(error.red);
                            },
                            function (progress) {}
                        );
                    },
                    function (error) {
                        console.error(error);
                    },
                    function (progress) {}
                );
            }
        }
        else {
            console.error("Can't create compress directory".red);
            //TODO: messenger
            //TODO: Can't create compress folder
        }
    }
    else {
        console.error(pathIsValid.red);
    }
};

tc.checkKeyStatus = function (key) {
    api.getCompressionCount(key).then(
        function (compressionCount) {
            console.log("You have made " + (compressionCount.green) + " compressions this month");
        },
        function (error) {
            console.error(error);
        }
    );
};

module.exports = tc;