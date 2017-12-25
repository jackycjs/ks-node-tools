const fs = require('fs')
const path = require('path')

const iconv = require('iconv-lite')

var file = {

  /**
   * 文件包裹
   * 对文件夹内所有文件 包裹一层当前文件名的文件夹
   * @param {*} basePath 
   */
  wrapFile(folderPath = './') {
    var files = fs.readdirSync(folderPath)

    files.forEach(file => {
      let filePath = path.resolve(folderPath, file)
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

  /**
   * 文件结构扁平化
   * 对文件夹内所有的子文件 移动到根目录
   * @param {*} folderPath 
   */
  flatFolder(folderPath = './') {
    const baseFolderPath = folderPath;
    moveFile(folderPath)
    
    function moveFile(folderPath) {
      let files = fs.readdirSync(folderPath)
      files.forEach(file => {
        let filePath = path.resolve(folderPath, file)
        if(!fs.statSync(filePath).isDirectory()) {
          fs.rename(filePath, path.resolve(baseFolderPath, file), err => {
            if (err) return console.error(`移动文件失败:${err}`)
          })
        } else {
          moveFile(filePath)
        }
      })

      console.log(files);
    }
  },

  /**
   * 文件转码
   * 对文件夹内所有文件进行转码 (主要用于字幕转码)
   * @param {*} folderPath 
   * @param {*} fromCoding 
   * @param {*} toCoding 
   */
  transCode(folderPath = './', fromCoding = 'gbk', toCoding = 'utf8') {
    let files = fs.readdirSync(folderPath)
    files.forEach(file => {
      let filePath = path.resolve(folderPath, file)
      if (!fs.statSync(filePath).isDirectory()) {
        let buf = fs.readFileSync(filePath)
        fs.writeFile(filePath, iconv.decode(buf, fromCoding), toCoding, function (err) {
          if (err) return console.error(`文件转码失败:${err}`)
        })
      }
    })

    console.log(files);
  }
}

module.exports = file