const getOptions = require('loader-utils').getOptions
const validateOptions = require('schema-utils')
const fs = require('fs')

const schema = {
  type: 'object',
  properties: {
    pxtorem: {
      rootValue: 'number'
    }
  }
}

module.exports = function (source) {
  const options = getOptions(this)
  // console.log(options)
  // console.log(source)
  validateOptions(schema, options, 'Example Loader')
  source = source.replace(/(\d+)px/g, (value) => {
    return `${value.split('px')[0] / options.pxtorem.rootValue}rem` 
  })
  return source
}
