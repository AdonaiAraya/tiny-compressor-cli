var program = require("commander");
var colors = require("colors");
var packageConfig = require("../package.json");
var tc = require("./core/main");
var utils = require("./core/utils");

var cli = {};

cli.run = function (processArgs) {
    program
        .version(packageConfig.version, "-v, --version")
        .description(packageConfig.description)
        .option("-p, --path <path>", "Relative or absolute path (file or folder) to the images (PNG or JPG) you want to compress")
        .option("-k, --key <key>", "API key from https://tinypng.com")
        .option("-s, --status", "The current status of your API key")
        .parse(processArgs);

    if(program.path && program.key){
        tc.compress(program.path, program.key);
    }
    else if(program.status && program.key){
        tc.checkKeyStatus(program.key);
    }
    else {
        utils.printer("You must supply a valid option!", "error");
    }
};

module.exports = cli;