//const tools = require('./tools.js')
const fs = require('fs')
const file = require('./file')

file.toUTF8_Dir('./filetest', 'gbk', 'utf8')


// console.log(fs.readFileSync('./filetest/123.txt', 'ansi'))