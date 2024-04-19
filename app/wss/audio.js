const loudness = require('loudness')
const _ = require('lodash')

/**
 * audio状态设置
 * @param {WebSocket} client
 * @param {{type: 'getVolume' | 'setVolume' | 'getMuted' | 'setMuted', data: number | boolean | undefined}} messageData
 */
function setSendAudio(client, messageData) {
  if (messageData.type === 'setVolume') {
    // 设置音量(1-100)
    let num = messageData.data
    if (_.isNumber(num) && !_.isNaN(num) && num >= 0 && num <= 100) {
      if (num === 0) num = 1
      loudness.setVolume(num)
    }
  } else if (messageData.type === 'setMuted') {
    // 设置静音
    const muted = messageData.data
    if (_.isBoolean(muted)) {
      loudness.setMuted(muted)
    }
  }
  getSendAudio(client)
}

/**
 * audio状态获取
 * @param {WebSocket} ws
 */
async function getSendAudio(ws) {
  // 获取发送音量(1-100)
  ws.send(JSON.stringify({ type: 'getVolume', data: await loudness.getVolume() }))
  // 获取发送静音状态
  ws.send(JSON.stringify({ type: 'getMuted', data: await loudness.getMuted() }))
}

module.exports = {
  setSendAudio,
  getSendAudio,
}
