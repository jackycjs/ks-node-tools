#!/usr/bin/env node

var program = require('commander');
var file = require('../lib/file.js');

program
  .command('wrap')
  .option("-p, --path [mode]")
  .action(function(options){
    file.wrapFile(options.path);
  })

program
  .command('flat')
  .option("-p, --path [mode]")
  .action(function(options){
    file.flatFolder(options.path);
  })

program
  .command('transcode')
  .option("-p, --path [mode]")
  .option("-f, --fromCoding [mode]")
  .option("-t, --toCoding [mode]")
  .action(function(options){
    file.transCode(options.path, options.fromCoding, options.toCoding);
  })

program.parse(process.argv);
