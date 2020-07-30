/**
 * 移动端阻止弹窗滚动工具类
 */
let targetY = 0

export default (el: HTMLElement) => {
  const touchstart = (e: TouchEvent) => {
    targetY = e.targetTouches[0].clientY
  }

  const touchmove = (e: TouchEvent) => {
    const newTargetY = e.targetTouches[0].clientY
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight
    const clientHeight = el.clientHeight
    if (scrollTop <= 0 && newTargetY - targetY >= 0) {
      e.cancelable && e.preventDefault()
    } else if (scrollTop >= scrollHeight - clientHeight && newTargetY - targetY <= 0) {
      e.cancelable && e.preventDefault()
    }
  }

  el.addEventListener('touchstart', touchstart)
  el.addEventListener('touchmove', touchmove)
  return () => {
    el.removeEventListener('touchstart', touchstart)
    el.removeEventListener('touchmove', touchmove)
  }
}
