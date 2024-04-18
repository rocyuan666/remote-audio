const path = require('node:path')
const http = require('node:http')
const express = require('express')
const ejs = require('ejs')
const { port } = require('./config/index')
const createWSS = require('./wss.js')
const useAllRouter = require('./router/index.js')
const { loggerApp } = require('./utils/logger.js')

/**
 * 程序入口
 */
function main() {
  const app = express()
  const server = http.createServer(app)
  createWSS(server)

  // 告诉Express使用EJS处理.html后缀的文件
  app.engine('.html', ejs.renderFile)
  // 告诉Express使用render方法渲染模版不指定后缀时，默认找.html后缀的文件
  app.set('view engine', 'html')
  // 设置视图目录
  app.set('views', path.resolve(__dirname, 'views'))
  // application/x-www-form-urlencoded;charset=UTF-8
  app.use(express.urlencoded({ extended: false }))
  // application/json;charset=UTF-8
  app.use(express.json())
  // 设置静态资源目录
  app.use(express.static(path.resolve(__dirname, 'public')))

  // 调用所有路由模块
  useAllRouter(app)

  server.on('error', (error) => {
    loggerApp.error(`app运行出错：${error}`)
  })

  server.on('close', () => {
    loggerApp.warn(`app运行关闭`)
  })

  server.listen(port, () => {
    loggerApp.info(`应用已在端口 ${port} 上运行~`)
  })

  return { server }
}
module.exports = main()
