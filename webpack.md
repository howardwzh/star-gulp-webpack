## webapck配置

### 参考文章：
- [webpack配置说明文档](https://doc.webpack-china.org/configuration/)
- [webpack容易混淆的部分](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9)

### entry 和 output
```js
{
    entry: [String | Array | Object],   // 入口模块
    output: {
        path: String,                   // 输出路径
        filename: String                // 输出名称或名称 pattern
        publicPath: String              // 指定静态资源的位置
        ...                             // 其他配置
    }
}
```

**常用配置如下：**
```js
{
    entry: {
        vendor: ['jquery', '...'],      // vendor入口模块
        index: 'path/to/index.js',      // index入口模块
        ...                             // 其它入口模块
    }, 
    output: {
        path: './dist/',                // 输出路径
        filename: '[name].[hash].js'    // 输出名称或名称 pattern
        publicPath: './assets/'         // 指定静态资源的位置
        ...                             // 其他配置
    }
}
```

### loader
> Webpack 本身只会处理 Javascript，为了实现将其他资源也定义为模块，并转化为 Javascript，
> Webpack 定义 loaders , 不同的 loader 可以将对应的资源转化为 Javascript 模块。

![](./assets-for-readme/images/loaders.png)

1. loader 管道：在同一种类型的源文件上，可以同时执行多个 loader，loader 的执行方式可以类似管道的方式，管道执行的方向为从右到左。
2. loader 可以支持同步和异步
3. loader 可以接收配置参数
4. loader 可以通过正则表达式或者文件后缀指定特定类型的源文件
5. 插件可以提供给 loader 更多功能
6. loader 除了做文件转换以外，还可以创建额外的文件

**基本格式：**
```js
{
    // 通过扩展名称和正则表达式来匹配资源文件
    test: String ,          
    // 匹配到的资源会应用 loader， loader 可以为 string 也可以为数组
    loader: String | Array
}
```

**常用配置如下：**
感叹号和数组可以定义 loader 管道
```js
{
    module: {
        loaders: [
            { test: /\.jade$/, loader: "jade" },
            // => .jade 文件应用  "jade" loader  

            { test: /\.css$/, loader: "style!css" },
            { test: /\.css$/, loaders: ["style", "css"] },
            // => .css 文件应用  "style" 和 "css" loader  
        ]
    }
}
```

loader 可以配置参数
```js
{
    module: {
        loaders: [
            // => url-loader 配置  mimetype=image/png 参数
            { 
                test: /\.png$/, 
                loader: "url-loader?mimetype=image/png" 
            }, {
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            }

        ]
    }
}
```

### 一些常用的loader / plugins

- webpack-bundle-analyzer 可以看到项目各模块的大小，可以按需优化
- webpack4，不再支持extract-text-webpack-plugin

### webpack4 兼容

#### webpack4，不再支持extract-text-webpack-plugin
原因：extract-text-webpack-plugin 最新版本为 3.0.2，这个版本还没有适应 webpack 4 的版本
解决办法：使用 4.0 beta 版，`npm install --save-dev extract-text-webpack-plugin@next`

#### webpack4 使用 html-webpack-plugin插件报错
解决方法：
`npm install webpack-contrib/html-webpack-plugin -D`