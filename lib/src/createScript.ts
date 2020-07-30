/**
 * 动态加载script
 * @param src {string}
 * @returns {promise}
 */
function createScripts(src: string): Promise<string | Error> {
  // 短时间内,多次调用时; 避免重复加载
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    document.head.appendChild(script)
    script.onerror = reject
    script.onload = () => resolve(src)
  })
}

export default createScripts
