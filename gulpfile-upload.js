'use strict'

// Node Modules
const gulp = require('gulp')
const clear = require('gulp-clean')
const glob = require('glob')
const mime = require('mime-types')
const Upyun = require('upyun')
const argv = require('yargs').argv;

// Config Files
const upyunConfig = require('./upyun.json') // 又拍云配置

/**
 * 上传多文件
 */
const fileTypes = '{png,jpg,gif,html,css,js,json,eot,svg,ttf,woff,woff2,apk}'
let totle = 0 // 上传文件的总数

// 清理之前完成的文件
gulp.task('clear-completes', (cb) => {
  return gulp.src(['./completes/*', '!./completes/placeholder.ph'])
    .pipe(clear({ force: true }))
})

// 传完之后清理空文件夹
function clearFiles(){
  gulp.src(['./files/*', '!./files/placeholder.ph'])
    .pipe(clear({ force: true }))
}

// 上传多文件
gulp.task('upload-multifiles', ['clear-completes'], (cb) => {
  const upyunpath = argv.upyunpath || '/download_test/jidai/' // 设置上传到又拍云的目录路径
  const num = Number(argv.num) || 1 // 设置每次上传的文件数，大文件建议每次上传少量
  uploadUpyun('./files', upyunpath, num)
})

// 将已上传的文件移到完成目录
function moveToComplete(file) {
  const fileName = file.split('files/')[1]
  console.log(fileName + ' 上传成功!') // 打印上传成功的文件名称
  gulp.src(file)
    .pipe(clear({ force: true }))
    .pipe(gulp.dest('completes/' + fileName.replace(/[^\/]+$/, '')))
}

/**
 * 上传又拍云（多文件轮流上次）
 * @function uploadUpyun
 * @param {string} localPath - 本地路径
 * @param {string} remotePath - 远程路径
 * @param {string} num - 每次上传的文件数
 */
function uploadUpyun(localPath, remotePath, num) {
  const upyun = new Upyun(upyunConfig.bucket, upyunConfig.operator, upyunConfig.password, 'v0.api.upyun.com', 'legacy')
  const localFile = glob.sync(localPath + '/**/*.' + fileTypes).slice(0, num)
  let i = 0
  for (var file of localFile) {
    let uploadFile = file.replace(/.:\/(.+\/)*!/, '')
    let realFileName = file.replace(glob.sync(localPath), '').replace(uploadFile, '').replace(/\/$/, '')
    let subDirectory = remotePath + realFileName
    let tempFile = file
    console.log(file.split('files/')[1] + ' 正在上传...') // 打印开始上传的文件名称
    upyun.uploadFile(subDirectory, file, mime.lookup(file), true, (err, result) => {
      if (err) console.log(err)
      if (result.statusCode !== 200) {
        console.log(`上传 ${file} 出问题了 `)
        console.log(result)
        console.log('\n')
        console.log('马上重新上传！')
        setTimeout(() => { uploadUpyun('./files', remotePath, num) }, 500)
      } else {
        moveToComplete(tempFile)
        totle++
        i++
      }
      if (i === localFile.length) {
        setTimeout(() => { uploadUpyun('./files', remotePath, num) }, 500)
      }
    })
  }
  if (!localFile.length) {
    console.log(totle + '个资源文件被上传到又拍云CDN/测试')
    clearFiles()
  }
}
