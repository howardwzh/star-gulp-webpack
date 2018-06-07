const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const HelloWorldPlugin = require('./plugins/hello-world-plugin/index')

// Create multiple instances
const extractHTML = new ExtractTextPlugin('[name].[chunkhash].html')
const extractCSS = new ExtractTextPlugin('[name].[chunkhash].css')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].js'
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'check-list-loader',
      options: {
        checkList: [{
          rule: /https?:\/\/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}(:\d*)?/, // 错误正则匹配
          msg: '线上发布脚本中不能含有本地测试ip！请删除后再执行发布操作。', // 错误消息
          type: 'warn' // 错误类型，error|warn，可不写默认error
        }]
      }
    }, {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src'),
        use: extractHTML.extract({
          use: [{
            loader: 'html-loader',
          },
          {
            loader: 'my-html-loader',
            options: {
              title: '测试html',
              layouts: [
                path.resolve(__dirname, 'src/html-parts/header.html'),
                path.resolve(__dirname, 'src/html-parts/body.html'),
                path.resolve(__dirname, 'src/html-parts/footer.html')
              ]
            }
          }]
        })
      },
       {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
         use: extractCSS.extract({
          use: [{
            loader: 'css-loader',
          },
          {
            loader: 'my-css-loader',
            options: {
              pxtorem: { rootValue: 50 }
            }
          }]
        })
      }
    ]
  },
  plugins: [
    new CleanPlugin(path.resolve(__dirname, 'public')),
    extractHTML,
    extractCSS,
    new HelloWorldPlugin({ options: true })
  ]
}