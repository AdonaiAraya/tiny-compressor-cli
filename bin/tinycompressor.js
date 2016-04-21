#!/usr/bin/env node
var cli = require('../lib/cli');
process.title = 'tinycompressor';
cli.run(process.argv);