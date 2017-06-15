# star-gulp-webpack
My star of gulp and webpack!

## 参考文章

- [gulp API 文档](http://www.gulpjs.com.cn/docs/api/)
- [基于Gulp的前端自动化工程搭建](http://mrzhang123.github.io/2016/09/07/gulpUse/)
- [Gulp 结构化最佳实践](http://gold.xitu.io/post/57bc5429128fe1005f99367e)
- [入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f)
- [Webpack从入门到上线](http://yincheng.site/webpack)
- [gulp & webpack整合，鱼与熊掌我都要！](http://www.jianshu.com/p/9724c47b406c)
- [想要设计gulp & webpack构建系统？看这儿！](http://www.jianshu.com/p/2cc6a22c9ecc)
- [如何打造一个令人愉悦的前端开发环境（一）](http://gold.xitu.io/post/57c659918ac24700635c0164)
- [如何打造一个令人愉悦的前端开发环境（二）](http://gold.xitu.io/post/57c940687db2a2007885b035)
- [yarn-支持离线安装包文件](https://yarnpkg.com/en/docs/install#windows-tab)

## 学习笔记

### gulp

#### 启程

1. 全局安装 gulp：
`$ npm install --global gulp`

2. 作为项目的开发依赖（devDependencies）安装：
`$ npm install --save-dev gulp`

3. 在项目根目录下创建一个名为 gulpfile.js 的文件：
```
var gulp = require('gulp');
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```
4. 运行 gulp：
`$ gulp`

默认的名为 default 的任务（task）将会被运行，在这里，这个任务并未做任何事情。

想要单独执行特定的任务（task），请输入 gulp <task> <othertask>。

#### 基础

1. `gulp.src(globs[, options])`

```
gulp.src('client/templates/*.jade')
  .pipe(jade())
  .pipe(minify())
  .pipe(gulp.dest('build/minified_templates'));
```
glob 请参考 node-glob 语法 或者，你也可以直接写文件的路径。

> **globs**
> 
> 类型： String 或 Array
> 所要读取的 glob 或者包含 globs 的数组。
> 
> **options**
> 类型： Object
> 通过 glob-stream 所传递给 node-glob 的参数。
> 除了 node-glob 和 glob-stream 所支持的参数外，gulp 增加了一些额外的选项参数：
> 
> **options.buffer**
> 类型： Boolean 默认值： true
> 如果该项被设置为 false，那么将会以 stream 方式返回 file.contents 而不是文件 
> buffer 的形式。这在处理一些大文件的时候将会很有用。
> **注意：**插件可能并不会实现对 stream 的支持。
> 
> **options.read**
> 类型： Boolean 默认值： true
> 如果该项被设置为 false， 那么 file.contents 
> 会返回空值（null），也就是并不会去读取文件。
> 
> **options.base**
> 类型： String 默认值： 将会加在 glob 之前 (请看 glob2base)
> 如, 请想像一下在一个路径为 client/js/somedir 的目录中，有一个文件叫 
> somefile.js ：
> 
> ```
> gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 
> `base` 解析为 `client/js/`
> .pipe(minify())
> .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'
> 
> gulp.src('client/js/**/*.js', { base: 'client' })
> .pipe(minify())
> .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'
> ```

### webapck
- 一种模块化的解决方案，不过Webpack的优点使得Webpack可以替代Gulp/Grunt类的工具
- 管理模块化，构建js/css

```
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",
    filename: "[name]-[hash].js"
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
      }
    ]
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name]-[hash].css")
  ]
}
```

### 目录结构

```
----------------------------project
    |
    |-----------------------dist
    |   |
    |   |-------------------styles
    |   |   |
    |   |   |---------------app-1d4fc1bf4d.css
    |   |   |---------------vendor-c2769e81fe.css
    |   |
    |   |-------------------scripts
    |   |   |
    |   |   |---------------app-96016e630b.js
    |   |   |---------------vendor-05946ca51e.js
    |   |
    |   |-------------------assets
    |   |   |
    |   |   |---------------fonts
    |   |   |---------------images
    |   |
    |   |-------------------index.html
    |
    |-----------------------src
    |   |
    |   |-------------------app
    |   |   |
    |   |   |---------------components
    |   |   |   |
    |   |   |   |-----------global-object
    |   |   |   |   |
    |   |   |   |   |-------global-object.service.js
    |   |   |   |   |-------global-object.service.spec.js
    |   |   |   |
    |   |   |   ...
    |   |   |
    |   |   |---------------home
    |   |   |   |
    |   |   |   |-----------home.html
    |   |   |   |-----------home.controller.js
    |   |   |   |-----------home.controller.spec.js
    |   |   |
    |   |   |---------------about
    |   |   |   |
    |   |   |   |-----------about.html
    |   |   |   |-----------about.controller.js
    |   |   |   |-----------about.controller.spec.js
    |   |   |
    |   |   |---------------app.js
    |   |   |---------------main.js
    |   |
    |   |-------------------assets
    |   |   |
    |   |   |---------------fonts
    |   |   |---------------images
    |   |
    |   |-------------------index.html
    |   |-------------------favicon.ico
    |
    |-----------------------gulp
    |   |
    |   |-------------------build-js
    |   |-------------------server.js
    |   |-------------------conf.js
    |   |-------------------unit-test.js
    |   |-------------------sprite.js
    |   ...
    |
    |-----------------------gulpfile.js
    |-----------------------package.json
    |-----------------------karma.conf.js
    ...

```