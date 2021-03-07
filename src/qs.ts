interface Obj {
  [key: string]: string
}

/**
 *
 * @param name {string}
 * @param search {string}  [a=1&b=2]
 * @returns {string || null}
 */
function get(name: string, search: string = window.location.href.split('?')[1]) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = (search || '').match(reg)
  if (r != null) return decodeURIComponent(r[2]) // unescape （w3c推荐使用decodeURI() 和 decodeURIComponent()）
  return null
}

/**
 * @desc   url参数转对象
 * @param  {String} search  default: window.location.href
 * @return {Object}
 */
function parse(url = window.location.search) {
  const params: Record<string, string> = {}
  url.replace(/([^?&=]+)=([^?&#]+)/g, (_, k, v) => (params[k] = v))
  return params
}

/**
 * @desc   对象序列化
 * @param  {Object} obj
 * @return {String}
 */
function stringify(obj: Obj) {
  if (!obj) return ''
  const pairs = []

  for (const key in obj) {
    const value: any = obj[key]

    if (value instanceof Array) {
      for (let i = 0; i < value.length; ++i) {
        const arrStr = `${key}[${i}]=${encodeURIComponent(value[i])}`
        pairs.push(arrStr)
      }
      continue
    }

    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  }

  return pairs.join('&')
}

export default {
  get,
  parse,
  stringify,
}
