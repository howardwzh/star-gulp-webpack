function HelloWorldPlugin(options) {
  // 使用 options 设置插件实例……
  // console.log(options)
}

HelloWorldPlugin.prototype.apply = (compiler) => {
  compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
    let fileList = 'In this build:\n\n'

    for (const k in compilation.assets) {
      fileList += `- ${k}\n`
    }
    // console.log(fileList)
    compilation.assets['fileList.md'] = {
      source: () => fileList,
      size: () => fileList.length
    }

    callback()
  });
};

module.exports = HelloWorldPlugin;