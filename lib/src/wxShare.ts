import axios from 'axios'
import { isWx } from './validate'

interface wxWin extends Window {
  wx?: any
}

interface ShareConfig {
  title: string
  desc: string
  link: string
  imgUrl: string
}

interface WxConfig {
  debug: boolean
  appId: string
  timestamp: string | number
  nonceStr: string
  signature: string
  jsApiList: string[]
}

/**
 * 加载sdk
 */
let PromiseSDK: Promise<undefined>
function loadWechatJSSDK() {
  if (PromiseSDK) {
    return PromiseSDK
  }
  // 短时间内,多次调用时; 避免重复加载
  PromiseSDK = new Promise((resolve, reject) => {
    const loaded = !!(window as wxWin).wx
    if (loaded) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = '//res.wx.qq.com/open/js/jweixin-1.4.0.js '
    document.head.appendChild(script)
    script.onerror = reject
    script.onload = () => {
      resolve()
    }
  })
  return PromiseSDK
}

/**
 * 获取分享配置
 */
async function getConfig(): Promise<WxConfig> {
  const href = window.location.href.split('#')[0]
  if (!href.includes('//www.luzhongkuan.cn')) {
    return Promise.reject(Error('没有加入分享配置'))
  }
  const { data } = await axios({
    url: `//www.luzhongkuan.cn/api/wx/shareConfig?url=${encodeURIComponent(
      href
    )}`
  })
  if (data.success) {
    return data.data
  }
  return Promise.reject(Error('获取分享配置失败'))
}

/**
 * 分享内容，分享配置
 * @param {Object} userShareData 文件对象
 * @param {Object} wxConfig 分享配置
 */
export default async (userShareData: ShareConfig, wxConfig: WxConfig) => {
  if (!isWx) return
  await loadWechatJSSDK()
  const defaultShare = {
    title: document.title, // 分享标题
    desc: '', // 分享描述
    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: 'http://lib.luzhongkuan.cn/images/logo.png' // 分享图标
  }
  const config = wxConfig || (await getConfig())
  const wx = (window as wxWin).wx
  if (!wx) return
  wx.config(config)
  wx.ready(() => {
    const shareData = { ...defaultShare, ...userShareData }
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    wx.updateAppMessageShareData(shareData)
    const timelineData = {
      title: shareData.desc || shareData.title, // 分享标题
      link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareData.imgUrl // 分享图标
    }
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    wx.updateTimelineShareData(timelineData)
  })
}
