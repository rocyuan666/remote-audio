const Page = {
  /**@type {WebSocket} */
  ws: null,
  init() {
    this.useRem(window, document)
    this.connectWs()
  },
  connectWs() {
    this.ws = new WebSocket(`ws://${location.hostname}:9674/ws`)
    this.ws.onmessage = (result) => {
      this.handleAudio(JSON.parse(result.data))
    }
    this.ws.onopen = () => {
      console.log("ws已连接")
      $("#connect-status").text("已连接")
      $("#connect-status").css({color: '#0f0'})
    }
    this.ws.onclose = () => {
      console.log("ws已断开")
      $("#connect-status").text("未连接")
      $("#connect-status").css({color: '#f00'})
    }
    this.ws.onerror = (error) => {
      console.log("ws连接错误", error)
      $("#connect-status").text("未连接")
      $("#connect-status").css({color: '#f00'})
    }
  },
  /**
   * 处理音频状态
   * @param {{type: 'getVolume' | 'setVolume' | 'getMuted' | 'setMuted', data: number | boolean | undefined}} data 
   */
  handleAudio(data) {
    if (data.type === "getVolume") {
      // 获取音量
      $("#audio-num").val(data.data)
      $("#num").text($("#audio-num").val())
    } else if (data.type === "getMuted") {
      // 获取静音
      if (data.data) {
        $("#audio-muted").text("关闭静音")
      } else {
        $("#audio-muted").text("开启静音")
      }
    }
  },
  /**
   * 音量滑块值变化 设置音量
   */
  changeAudioNum(e) {
    $("#num").text(e.value)
    this.setAudioNum()
  },
  setAudioNum: _.throttle(function() {
    const num = Number($("#num").text())
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({type: 'setVolume', data: num}))
    }
  }, 500),
  /**
   * 设置是否静音
   */
  setAudioMuted() {
    let muted
    if ($("#audio-muted").text() === '开启静音') {
      muted = true
    } else {
      muted = false
    }
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({type: 'setMuted', data: muted}))
    }
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
}
Page.init()
