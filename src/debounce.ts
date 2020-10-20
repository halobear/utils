/**
 * @description: 防抖函数
 * @param {Function} fn
 * @param {Number} time
 */

let timer: any;
function debounce(fn: Function, time: number = 300) {
  if (typeof fn !== "function") {
    throw new Error("必须传入一个函数作为参数");
  }
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    fn();
  }, time);
}

export default debounce;
