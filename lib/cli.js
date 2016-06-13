var program = require("commander");
var colors = require("colors");
var packageConfig = require("../package.json");
var tc = require("./core/main");
var utils = require("./core/utils");

var cli = {};

cli.run = function (processArgs) {
    program
        .version(packageConfig.version, "-v, --version")
        .description(packageConfig.description);

    //Compress
    program
        .command("compress [path]")
        .description("Relative or absolute path (file or folder) to the images (PNG or JPG) you want to compress")
        .action(function (path) {
            if(path){

                //tc.compress(program.path, program.key);
            }
            else {
                utils.printer("You must specify a path (file or folder)", "error");
            }
        });

    //Key
    program
        .command("key [apikey]")
        .description("Save the API key from https://tinypng.com for future uses")
        .action(function (apikey) {
            if(apikey){
                tc.key(apikey);
            }
            else {
                utils.printer("You must specify an API KEY", "error");
            }
        });

    //Status
    program
        .command("status")
        .description("The current status of your saved API key")
        .action(function () {
            console.log("status");
            //tc.status(program.key);
        });

    //Args
    program.parse(processArgs);
};

module.exports = cli;