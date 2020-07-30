/**
 * 前端监控
 */

namespace ErrorMonitor {
  interface OtherData {
    [x: string]: string
  }

  export interface Settings {
    id: string
    uin: string
    reportUrl?: string
    otherData?: OtherData
  }

  export interface NewLog {
    msg: string
    target: string | undefined
    rowNum: number
    colRow: number
    from?: string
  }
}

// 默认配置
const defaultsSettings: ErrorMonitor.Settings = {
  id: '',
  uin: '',
  reportUrl: '',
}

// 错误日志储存
function processStackMsg(error: Error) {
  let stack = (error.stack || '')
    .replace(/\n/gi, '')
    .split(/\bat\b/)
    .slice(0, 9)
    .join('@')
    .replace(/\?[^:]+/gi, '')
  const msg = error.toString()
  return stack.indexOf(msg) < 0 ? `${msg}@${stack}` : stack
}

function isOBJByType(o: string | Event, type: string) {
  return Object.prototype.toString.call(o) === `[object ${type || 'Object'}]`
}

class ErrorReportHandler {
  private timer: any
  private settings: ErrorMonitor.Settings
  private logs: Array<ErrorMonitor.NewLog>
  constructor(options: ErrorMonitor.Settings) {
    this.settings = { ...defaultsSettings, ...options }
    this.logs = []
    this.handleError()
  }

  private handleError() {
    if (!this.settings.reportUrl) return
    window.onerror = (msg, url, line, col, error) => {
      let newMsg = msg

      if (error && error.stack) {
        newMsg = processStackMsg(error)
      }

      if (isOBJByType(newMsg, 'Event')) {
        const msg = newMsg as any
        newMsg += msg.type
          ? '--' + msg.type + '--' + (msg.target ? msg.target.tagName + '::' + msg.target.src : '')
          : ''
      }

      const newLog: ErrorMonitor.NewLog = {
        msg: (newMsg + '' || '').substr(0, 500),
        target: url,
        rowNum: line || 0,
        colRow: col || 0,
      }

      // 避免重复添加
      this.logs = this.logs.slice(0, 9)
      if (this.logs.some((log) => log.msg === newLog.msg)) return
      this.logs.unshift(newLog)
      this.sendError()
    }
  }
  sendError() {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const { otherData = {}, id, uin, reportUrl } = this.settings
      const stringify: string[] = []
      stringify.push(`id=${id}`, `uin=${uin}`)

      this.logs.forEach((newLog, i) => {
        const params = { from: window.location.href, level: 0, ...newLog, ...otherData }
        Object.keys(params).forEach((key) => {
          const value = (params as any)[key]
          stringify.push(`${key}[${i}]=${value}`)
        })
      })
      const src = `${reportUrl}?${stringify.join('&')}`
      const img = new Image()
      img.src = src
      this.logs = []
    }, 1000)
  }
}

// 暴露单例
let errorReport: ErrorReportHandler
export default (settings: ErrorMonitor.Settings) => {
  if (errorReport) return errorReport
  errorReport = new ErrorReportHandler(settings)
  return errorReport
}
