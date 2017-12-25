const fs = require('fs')
const path = require('path')

const iconv = require('iconv-lite')

var file = {
  wrapFile(basePath) {
    basePath = basePath || './'
    var files = fs.readdirSync(basePath)

    files.forEach(file => {
      let filePath = path.resolve(basePath, file)
      let { dir, name, base } = path.parse(filePath)
      if (!fs.statSync(filePath).isDirectory()) {
        let newDirPath = path.resolve(dir, name)
        let newFilePath = path.resolve(newDirPath, base)
        fs.mkdir(newDirPath, err => {
          if (err) return console.error(`生成文件夹失败:${err}`)
          fs.rename(filePath, newFilePath, err => {
            if (err) return console.error(`移动文件失败:${err}`)
          })
        })
      }
    })
    console.log(files);
  },
  toUTF8_Dir: function (dirName, fromCoding, toCoding) {
    var files = fs.readdirSync(dirName)
    files.forEach(function (file) {
      var pathName = dirName + '/' + file
      var status = fs.lstatSync(pathName)
      console.log(pathName)

      if (!status.isDirectory()) {
        var buf = fs.readFileSync(pathName)
        fs.writeFile(pathName, iconv.decode(buf, fromCoding), toCoding, function (err) {
          if (err) return console.error(`文件转码失败:${err}`)
        })
      } else {
        transformDirCoding(pathName)
      }
    })
  }
}

module.exports = file