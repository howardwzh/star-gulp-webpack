module.exports = function (source) {
  source = source.replace(/\/\/.*/, '').replace(/\/\*[\s\S]*\*\//, '')
  console.log(source)
  return source;
}
