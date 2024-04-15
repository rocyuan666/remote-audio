const path = require('node:path')
const loudness = require('loudness')
const _ = require('lodash')
const express = require('express')
const ejs = require('ejs')

/**
 * @description 程序入口
 */
function main() {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname, 'views'))
  app.use(express.urlencoded())
  app.use(express.json())
  app.use(express.static(path.resolve(__dirname, 'public')))

  app.get('/', (req, res) => {
    res.render('index')
  })

  // 获取音量
  app.get('/api/plus', async (req, res) => {
    try {
      const num = await loudness.getVolume()
      res.json({
        code: 0,
        data: num,
        msg: 'success',
      })
    } catch (error) {
      res.json({
        code: -1,
        data: error,
        msg: 'error',
      })
    }
  })

  // 设置音量
  app.post('/api/plus', (req, res) => {
    let num = req.body.num
    if (_.isNumber(num) && !_.isNaN(num) && num >= 0 && num <= 100) {
      if (num === 0) num = 1
      loudness.setVolume(num)
      res.json({
        code: 0,
        data: num,
        msg: 'success',
      })
    } else {
      loudness.setVolume(num)
      res.json({
        code: -1,
        data: null,
        msg: 'error',
      })
    }
  })

  // 获取是否静音
  app.get('/api/muted', async (req, res) => {
    try {
      const muted = await loudness.getMuted()
      res.json({
        code: 0,
        data: muted,
        msg: 'success',
      })
    } catch (error) {
      res.json({
        code: -1,
        data: error,
        msg: 'error',
      })
    }
  })

  // 设置是否静音
  app.post('/api/muted', (req, res) => {
    let muted = req.body.muted
    if (_.isBoolean(muted)) {
      loudness.setMuted(muted)
      res.json({
        code: 0,
        data: muted,
        msg: 'success',
      })
    } else {
      res.json({
        code: -1,
        data: null,
        msg: 'error',
      })
    }
  })

  app.listen(9674, () => {
    console.log('启动成功')
  })
}
main()
