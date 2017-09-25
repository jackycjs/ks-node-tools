const fs = require('fs')

var file = {
  toUTF8_Dir: function (dirName, fromCoding, toCoding, filters) {
    var files = fs.readdirSync(dirName)
    files.forEach(function (file) {
      var pathName = dirName + '/' + file
      var status = fs.lstatSync(pathName)

      console.log(pathName)

      var buf = '\uFEFF' + fs.readFileSync(pathName)

      if(!status.isDirectory()) {
        fs.writeFile(pathName, buf, toCoding, function (err) {
          if (err) throw err
        })
      } else {
        transformDirCoding(pathName)
      }
    })
  }
} 

module.exports = file