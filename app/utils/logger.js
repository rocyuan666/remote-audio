const path = require('node:path')
const log4js = require('log4js')

log4js.configure({
  appenders: {
    // 标准输出流
    out: { type: 'stdout' },
    // app server 日志
    app: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../', 'logs', 'app', 'log'),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      fileNameSep: '.',
      encoding: 'utf-8',
      maxLogSize: '10M',
      numBackups: 3,
      mode: 0o666,
      layout: {
        type: 'basic',
      },
    },
    // websocket server 日志
    wss: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../', 'logs', 'wss', 'log'),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      fileNameSep: '.',
      encoding: 'utf-8',
      maxLogSize: '10M',
      numBackups: 3,
      mode: 0o666,
      layout: {
        type: 'basic',
      },
    },
  },
  categories: {
    default: { appenders: ['out'], level: 'all' },
    app: { appenders: ['app', 'out'], level: 'all' },
    wss: { appenders: ['wss', 'out'], level: 'all' },
  },
})

const logger = log4js.getLogger('default')
const loggerApp = log4js.getLogger('app')
const loggerWss = log4js.getLogger('wss')

module.exports = {
  logger,
  loggerApp,
  loggerWss,
}
