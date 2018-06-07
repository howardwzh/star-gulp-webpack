## check-list-loader

- default: check local ip
- you can set custom check rule in options like belowe eg.

### step 1

`npm i check-list-loader --save-dev`

### step 2

In webpack.config.js

```js
...
module: {
  rules: [{
    test: /\.js$/,
    loader: 'check-list-loader',
    options: {
      checkList: [{
        rule: /https?:\/\/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}(:\d*)?/, // 错误正则匹配
        msg: '线上发布脚本中不能含有本地测试ip！请删除后再执行发布操作。', // 错误消息
        type: 'error' // 错误类型，error|warn，可不写默认error
      }]
    }]
  }
  ...
  ]
}
...
```

### step 3

set options like this:

```js
{
  options: {
    checkList: [{
      rule: /https?:\/\/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}(:\d*)?/, // 错误正则匹配
      msg: '线上发布脚本中不能含有本地测试ip！请删除后再执行发布操作。', // 错误消息
      type: 'error' // 错误类型，error|warn，可不写默认error
    }]
  }]
}
```