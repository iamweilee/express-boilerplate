const fs = require('fs');
const _ = require('lodash');
const path = require('path');

/**
 * 确保路径对应的目录存在, 若不存在则新建目录, 若存在则不做任何操作(支持多级目录)
 * @param {String} dirpath 目录路径
 */
exports.ensureDirExists =  function(dirpath) {
  let sep = /\//.test(dirpath) ? '/' : (/\\/.test(dirpath) ? '\\' : '');
  let pathArr = dirpath.split(sep);
  dirpath = '';
  pathArr.forEach((s, index) => {
    if (index === 0) {
      if (s === '') {
        dirpath += sep;
      }
      else if (s === '.') {
        dirpath += '.' + sep;
      }
      else {
        dirpath += s + sep;
      }
    }
    else {
      dirpath += s + sep;
    }

    if (fs.existsSync(dirpath)) {
      let stat = fs.lstatSync(dirpath);
      if (!stat.isDirectory()) {
        fs.mkdirSync(dirpath);
      }
    }
    else {
      fs.mkdirSync(dirpath);
    };
  })
};

/**
 * 遍历目录及子目录
 * @param {String|File} rootDir 需要被遍历的根目录
 * @param {Function} handle 对应每一个目录下文件的处理函数
 * @param {Integer} depth 遍历的深度，若为空则一直遍历到最深一层子目录
 */
exports.walk = function(rootDir, handle, depth) {

};