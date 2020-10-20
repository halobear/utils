/**
 * @description: 函数节流
 * @param {fn} Function
 * @param {time} Number 截流时间
 */
declare function throttle(fn: Function, time?: number): void;
export default throttle;
