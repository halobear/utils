/**
 * @desc 根据name读取cookie
 * @param  {String} name
 * @return {String} cookie
 */
function getCookie(name: string) {
  const arr = document.cookie.replace(/\s/g, "").split(";");
  for (let i = 0; i < arr.length; i++) {
    const tempArr = arr[i].split("=");
    if (tempArr[0] === name) {
      return decodeURIComponent(tempArr[1]);
    }
  }
  return "";
}

/**
 * @desc  设置Cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 */
function setCookie(name: string, value: string | number, days = 1) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = name + "=" + value + ";expires=" + date;
}

/**
 * @desc 根据name删除cookie
 * @param  {String} name
 */
function removeCookie(name: string) {
  // 设置已过期，系统会立刻删除cookie
  setCookie(name, "", -1);
}

export default {
  get: getCookie,
  set: setCookie,
  remove: removeCookie
};
