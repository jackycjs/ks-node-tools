const iconv = require('iconv-lite')
const fs = require('fs')

var file = {
  toUTF8_Dir: function (dirName, fromCoding, toCoding, filters) {
    var files = fs.readdirSync(dirName)
    files.forEach(function (file) {
      var pathName = dirName + '/' + file
      var status = fs.lstatSync(pathName)
      console.log(pathName)

      if(!status.isDirectory()) {
        var buf = fs.readFileSync(pathName)
        fs.writeFile(pathName, iconv.decode(buf, fromCoding), toCoding, function (err) {
          if (err) throw err
        })
      } else {
        transformDirCoding(pathName)
      }
    })
  }
} 

module.exports = file