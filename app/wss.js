const http = require('node:http')
const moment = require('moment')
const { WebSocketServer, WebSocket } = require('ws')
const { loggerWss } = require('./utils/logger')
const { getSendAudio, setSendAudio } = require('./wss/audio')
moment.locale('zh-cn')

/**
 * 创建 websocket 服务器
 * @param {http.Server} server
 */
function createWSS(server) {
  const wss = new WebSocketServer({ server, path: '/ws' })
  loggerWss.info('websocket 服务器创建成功')

  wss.on('connection', (ws, request) => {
    loggerWss.info('websocket 用户连接成功')
    getSendAudio(ws)
    ws.on('message', (message) => {
      const data = JSON.parse(message.toString())
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          setSendAudio(client, data)
        }
      })
    })

    ws.on('error', (error) => {
      loggerWss.error(`websocket 用户连接出错：${error}`)
    })

    ws.on('close', () => {
      loggerWss.warn(`websocket 用户连接断开`)
    })
  })

  wss.on('error', (error) => {
    loggerWss.error(`websocket 服务器出错：${error}`)
  })

  wss.on('close', () => {
    loggerWss.warn(`websocket 服务器关闭`)
  })
}

module.exports = createWSS
