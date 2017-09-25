const fs = require('fs')
const iconv = require('iconv-lite')

var file = {
    transformFileCoding: function (fileName, formCoding, toCoding) {
        console.log('transformFileCoding')
    },
    transformDirCoding: function (dirName, formCoding, toCoding, filters) {
        console.log('transformDirCoding')
    }
} 

module.exports = file