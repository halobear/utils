/**
 * 截流函数
 * @param fn 执行函数
 * @param time 间隔ms
 */
export function throttle(fn: (...args: any[]) => void, time: number = 300) {
  let timer: NodeJS.Timeout | null
  let firstInvoke = true
  return throttled

  function throttled(...args: any[]) {
    if (firstInvoke) {
      firstInvoke = false
      // @ts-ignore
      return fn.call(this, ...args)
    }
    if (timer) return
    timer = setTimeout(() => {
      // @ts-ignore
      fn.call(this, ...args)
      timer = null
    }, time)
  }
}

/**
 * 防抖函数
 * @param fn 执行函数
 * @param time 间隔ms
 */
export function debounce(fn: (...args: any[]) => void, time: number = 300) {
  let timer: NodeJS.Timeout | null
  return debounced

  function debounced(...args: any[]) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-ignore
      fn.call(this, ...args)
      timer = null
    }, time)
  }
}
