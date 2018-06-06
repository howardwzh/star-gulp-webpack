/**
 * 针对指定文件类型的checkList，不同文件类型可使用不同规则，一般是js脚本
 * 
 * example:
 * 
 * {
 *    test: /\.js$/,
 *    loader: 'check-list-loader',
 *    options: {
 *      checkList: [{
 *        rule: /https?:\/\/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}(:\d*)?/, // 错误正则匹配
 *        msg: '线上发布脚本中不能含有本地测试ip！请删除后再执行发布操作。', // 错误消息
 *        type: 'error' // 错误类型，error|warn，可不写默认error
 *      }]
 *    }
 * }
 */
const getOptions = require('loader-utils').getOptions

module.exports = function (source) {
  const options = getOptions(this)
  const checkList = options.checkList || []
  checkList.forEach(item => {
    if(item.rule.test(source)) {
      const emitType = item.type === 'warn' ? 'emitWarning' : 'emitError'
      this[emitType](new Error(item.msg))
    }
  });
  return source
}
