const isIP = require('./utils/patterns.js').isIP

module.exports = function (source) {
  if (isIP.test(source)) {
    // this.emitWarning(new Error(`线上发布脚本中不能含有本地测试ip！请删除后再执行发布操作。`))
    this.emitError(new Error(`线上发布脚本中不能含有本地测试ip！请删除后再执行发布操作。`))
  }
  return source
}
