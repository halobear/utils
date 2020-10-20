let timer: number;

/**
 * @description: 函数节流
 * @param {fn} Function
 * @param {time} Number 截流时间
 */
function throttle(fn: Function, time = 300) {
  if (typeof fn !== "function") {
    throw new Error("必须传入一个函数作为参数");
  }
  if (!timer) {
    timer = window.setTimeout(() => {
      fn();
      timer = 0;
    }, time);
  }
}

export default throttle;
