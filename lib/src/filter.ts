import dayjs from "./dayjs";

/**
 * @desc 隐藏手机号
 * @param {*} str
 * @returns {string}
 */
export function hidePhone(phone: string | number = ""): string {
  return phone.toString().replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

/**
 * @desc 获取字符串字节
 * @param {*} str
 * @returns {number}
 */
export function byteSize(str: string): number {
  return new Blob([str]).size;
}

/**
 * @desc html转化防止xs攻击
 * @params str {string}
 * @returns {string}
 */
export function htmlEncode(str: string = ""): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2f;");
}

/**
 * @desc 格式化货币
 * @param num {string || number}
 * @returns {string}
 */
export function formatCurrency(num: number | string) {
  return (+num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */
export function timeAgo(startTime: Date | string) {
  const currentTime = new Date().getTime();
  const time = currentTime - dayjs.toDate(startTime).getTime();
  const day = Math.floor(time / (1000 * 60 * 60 * 24));
  const hour = Math.floor(time / (1000 * 60 * 60));
  const min = Math.floor(time / (1000 * 60));
  const month = Math.floor(day / 30);
  const year = Math.floor(month / 12);
  if (year) return year + "年前";
  if (month) return month + "月前";
  if (day) return day + "天前";
  if (hour) return hour + "小时前";
  if (min) return min + "分钟前";
  else return "刚刚";
}

/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
export function remainTime(endTime: Date | string) {
  const startDate = new Date(); // 开始时间
  const endDate = dayjs.toDate(endTime); // 结束时间
  const t = endDate.getTime() - startDate.getTime(); // 时间差
  let d = 0;
  let h = 0;
  let m = 0;
  let s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
  }
  return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}

export default {
  hidePhone,
  byteSize,
  htmlEncode,
  formatCurrency,
  timeAgo,
  remainTime
};
