#!/usr/bin/env node

var program = require('commander');
// var filr = require('../lib/file.js');

program
  .command('hello')
  .option("-w, --word [mode]")
  .action(function(options){
    console.log('hello', options.word);
  })

  
program.parse(process.argv);
