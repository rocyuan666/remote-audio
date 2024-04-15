// @ts-nocheck
const Page = {
  init() {
    this.useRem(window, document)
    this.refresh()
  },
  refresh() {
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
   * 音量滑块值变化
   */
  changeAudioNum(e) {
    document.getElementById('num').innerHTML = e.value
  },
  /**
   * 获取音量
   */
  getAudioNum() {
    axios.get('/api/plus').then((res) => {
      document.getElementById('audio-num').value = res.data.data
      document.getElementById('num').innerHTML = document.getElementById('audio-num').value
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
      if (res.data.data) {
        document.getElementById('audio-muted').innerHTML = '关闭静音'
      } else {
        document.getElementById('audio-muted').innerHTML = '开启静音'
      }
    })
  },
  /**
   * 设置是否静音
   */
  setAudioMuted() {
    let muted
    if (document.getElementById('audio-muted').innerHTML === '开启静音') {
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
