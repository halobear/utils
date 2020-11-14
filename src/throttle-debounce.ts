/**
 * 截流函数
 * @param fn 执行函数
 * @param time 间隔ms
 */
 export function throttle(fn: (...args:any[]) => void, time: number = 300) {
  let timer: NodeJS.Timeout | null
  let firstInvoke = true
  const throttled = (...args:any[]) => {
    if (firstInvoke) {
      firstInvoke = false
      return fn(...args)
    }
    if (timer) return
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, time)
  }
  return throttled
 }

/**
 * 防抖函数
 * @param fn 执行函数
 * @param time 间隔ms
 */
export function debounce(fn: (...args: any[]) => void, time:number = 300) {
  let timer:NodeJS.Timeout | null
  const debounced = (...args: any[]) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, time)
  }

  return debounced
}

