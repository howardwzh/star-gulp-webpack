var loaderUtils = require('loader-utils')
var fs = require('fs')

module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  console.log(options)
  console.log(source)
  let layoutHtml = ''
  options.layouts.forEach(l => {
    layoutHtml += fs.readFileSync(l, 'utf-8')
  });
  source = source.replace('{{ __title__ }}', options.title).replace('{{ __content__ }}', layoutHtml)
  console.log(source)
  return source
}
