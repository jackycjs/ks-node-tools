#!/usr/bin/env node

var program = require('commander');
var file = require('../lib/file.js');

program
  .command('hello')
  .option("-w, --word [mode]")
  .option("-p, --path [mode]")
  .action(function(options){
    // console.log('hello', options.word);
    file.wrapFile(options.path);
  })

  
program.parse(process.argv);
