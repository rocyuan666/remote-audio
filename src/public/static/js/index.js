// @ts-nocheck
const Page = {
  init() {
    this.useRem(window, document)
    this.getAudioNum()
    this.getAudioMuted()
  },
  /**
   * 屏幕适应
   * @param {Window} win
   * @param {Document} doc
   */
  useRem(win, doc) {
    if (!win.addEventListener) return
    var html = document.documentElement
    function setFont() {
      var html = document.documentElement
      var k = 750
      html.style.fontSize = (html.clientWidth / k) * 100 + 'px'
    }
    setFont()
    setTimeout(function () {
      setFont()
    }, 300)
    doc.addEventListener('DOMContentLoaded', setFont, false)
    win.addEventListener('resize', setFont, false)
    win.addEventListener('load', setFont, false)
  },
  /**
   * 获取音量
   */
  getAudioNum() {
    axios.get('/api/plus').then((res) => {
      document.getElementById('audio-num').value = res.data.data
    })
  },
  /**
   * 设置音量
   */
  setAudioNum() {
    const num = Number(document.getElementById('audio-num').value)
    axios.post('/api/plus', { num: num }).then((res) => {
      this.getAudioNum()
    })
  },
  /**
   * 获取是否静音
   */
  getAudioMuted() {
    axios.get('/api/muted').then((res) => {
      document.getElementById('muted').innerHTML = res.data.data
    })
  },
  /**
   * 设置是否静音
   */
  setAudioMuted() {
    let muted
    if (document.getElementById('muted').innerHTML === 'false') {
      muted = true
    } else {
      muted = false
    }
    axios.post('/api/muted', { muted: muted }).then((res) => {
      this.getAudioMuted()
    })
  },
}
Page.init()
