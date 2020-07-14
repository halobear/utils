/**
 * @desc   判断浏览器类型
 * @return {Boolean}
 */
let userAgent: string = ''
if (typeof navigator !== 'undefined') {
  userAgent = navigator.userAgent.toLowerCase()
}

// ios浏览器
export const isIOS = /iPhone|iPad|iPod|iOS/i.test(userAgent)

// 判断是否是iphonex
export const isIphoneX = /iPhone[\s\S]*OS X/.test(userAgent)

// 微信浏览器
export const isWx = /micromessenger/i.test(userAgent)

// 支付宝
export const isAliPay = /alipayclient/.test(userAgent)

/**
 * @desc   判断是否pc页面
 * @return {Boolean}
 */
export const isPc = !/Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent)

/**
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export function isPhone(str: string) {
  return /^(0|86|17951)?1[3456789]\d{9}$/.test(str)
}

/**
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
export function isEmail(str: string) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
}

/**
 * @desc   判断是否是数字
 * @param  {String|Number} str
 * @return {Boolean}
 */
export function isNum(str: string) {
  return /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(str)
}

/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export function isIdCard(str: string) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
    str
  )
}

/**
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
export function isUrl(str: string) {
  // eslint-disable-next-line
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(
    str
  )
}

/**
 * @param url 图片地址
 * @returns {boolean}
 */
export function isImage(url: string) {
  if (!url) return false
  const index = url.lastIndexOf('.')
  if (index === -1) return false
  const suffix = url.substr(index + 1)
  const str = suffix.substr(0, suffix.indexOf('?'))

  return /png|gif|svg|jpg|icon|jpeg]/i.test(str)
}

export default {
  isIOS,
  isWx,
  isAliPay,
  isPc,
  isPhone,
  isEmail,
  isNum,
  isIdCard,
  isUrl,
  isImage,
}
