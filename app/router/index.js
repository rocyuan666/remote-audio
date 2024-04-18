const express = require('express')
const homeRouter = require('../controller/home.js')

/**
 * 路由模块集中处理
 * @param {express.Express} app
 */
function useAllRouter(app) {
  app.use('/', homeRouter)
  app.use('*', (req, res) => res.render('error/404'))
}

module.exports = useAllRouter
