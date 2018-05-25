var loaderUtils = require('loader-utils')
var fs = require('fs')

module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  console.log(options)
  console.log(source)
  source = source.replace(/(\d+)px/g, (value) => {
    return `${value.split('px')[0]/50}rem` 
  })
  return source
}
