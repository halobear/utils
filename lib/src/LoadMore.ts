import throttle from './throttle'

export default class LoadMore {
  loadMoreFn: (() => void) | null
  constructor(toLoadMore = () => {}) {
    // 加载更多
    this.loadMoreFn = () => {
      const ele = document.documentElement
      const bo = document.body
      const clientHeight = ele.clientHeight || bo.clientHeight
      const scrollTop = ele.scrollTop || bo.scrollTop
      const scrollHeight = bo.scrollHeight || ele.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight - 80) {
        throttle(toLoadMore)
      }
    }

    // 绑定事件
    window.addEventListener('scroll', this.loadMoreFn)
  }

  // 取消监听
  destroy() {
    if (this.loadMoreFn) {
      window.removeEventListener('scroll', this.loadMoreFn)
      this.loadMoreFn = null
    }
  }
}
