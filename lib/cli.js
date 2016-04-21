var program = require("commander");
var packageConfig = require("../package.json");

var cli = {};

cli.run = function (processArgs) {
    program
        .version(packageConfig.version, "-v, --version")
        .description(packageConfig.description)
        .option("-p, --path <path>", "Relative or absolute path (file or folder) to the images (PNG or JPG) you want to compress")
        .option("-k, --key <key>", "API key from https://tinypng.com")
        .parse(processArgs);

};

module.exports = cli;