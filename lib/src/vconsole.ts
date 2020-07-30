import createScript from './createScript'

interface ExportVconsole {
  _vConsole: any
  init(src: string): void
  show(src: string): void
  hide(): void
}

interface consoleWin extends Window {
  VConsole: any
}

const defaultCDN = 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js'

let p: Promise<String | Error>

/**
 * 加载vconsole
 * @param src vconsole cdn资源
 */
function loadVconsole(src = defaultCDN) {
  if (p) return p
  p = createScript(src)
  return p
}

const exportVconsole: ExportVconsole = {
  _vConsole: null,
  async init(src: string) {
    if (this._vConsole) return this._vConsole
    await loadVconsole(src)
    const VConsole = ((window as unknown) as consoleWin).VConsole
    if (typeof VConsole === 'function') {
      this._vConsole = new VConsole()
    }
  },
  async show(src: string) {
    await this.init(src)
    if (this._vConsole) {
      this._vConsole.showSwitch()
    }
  },
  hide() {
    if (this._vConsole) {
      this._vConsole.destroy()
      this._vConsole = null
    }
  },
}

export default exportVconsole
