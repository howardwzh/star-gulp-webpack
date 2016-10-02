# star-gulp-webpack
My star of gulp and webpack!

## Reference
- [基于Gulp的前端自动化工程搭建](http://mrzhang123.github.io/2016/09/07/gulpUse/)
- [Gulp 结构化最佳实践](http://gold.xitu.io/post/57bc5429128fe1005f99367e)
- [入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f)
- [Webpack从入门到上线](http://yincheng.site/webpack)
- [gulp & webpack整合，鱼与熊掌我都要！](http://www.jianshu.com/p/9724c47b406c)
- [想要设计gulp & webpack构建系统？看这儿！](http://www.jianshu.com/p/2cc6a22c9ecc)
- [如何打造一个令人愉悦的前端开发环境（一）](http://gold.xitu.io/post/57c659918ac24700635c0164)
- [如何打造一个令人愉悦的前端开发环境（二）](http://gold.xitu.io/post/57c940687db2a2007885b035)

## R-Notes
### gulp
- 优化前端的开发流程的工具
- 处理html压缩/预处理/条件编译，图片压缩，精灵图自动合并等任务

例：生成sprite图片和样式
```
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var conf = require('./conf');

gulp.task('sprite:icon', function () {
  var spriteData = gulp.src(conf.paths.sprite+'/icon/*.{png,gif,jpg}')
  .pipe(spritesmith({
    imgName: 'sprite_icon.png',
    cssName: 'sprite_icon.css',
    padding: 5,
    algorithm: 'top-down',
    cssTemplate: conf.paths.sprite+'/icon.template.mustache'
  }));
  
  var imgStream = spriteData.img
    .pipe(imagemin())
    .pipe(gulp.dest(conf.paths.images));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest(conf.paths.styles));

  return merge(imgStream, cssStream);
});
```

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