var program = require("commander");
var colors = require("colors");
var packageConfig = require("../package.json");
var tc = require("./core/main");

var cli = {};

cli.run = function (processArgs) {
    program
        .version(packageConfig.version, "-v, --version")
        .description(packageConfig.description)
        .option("-p, --path <path>", "Relative or absolute path (file or folder) to the images (PNG or JPG) you want to compress")
        .option("-k, --key <key>", "API key from https://tinypng.com")
        .option("-s, --state <state>", "The current state of your API key")
        .parse(processArgs);

    if(program.path && program.key){
        tc.compress(program.path, program.key);
    }
    else if(program.state && program.key){
        tc.checkKeyStatus(program.key);
    }
    else {
        console.log("You must supply a valid option!".red);
    }
};

module.exports = cli;