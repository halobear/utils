let top: number = 0;

/**
 * 锁定滚动
 * @param key{string}
 * @param value{string}
 * @param maxAge{number} 分钟 (默认7天)
 */
function lock(shouldLock = true) {
  const bodyEl = document.body;

  if (shouldLock) {
    if (bodyEl.style.position === "fixed") return;
    top = window.scrollY;
    bodyEl.style.position = "fixed";
    bodyEl.style.top = `-${top}px`;
    bodyEl.style.width = "100%";
  } else {
    bodyEl.style.position = "";
    bodyEl.style.top = "";
    bodyEl.style.width = "";

    window.scrollTo(0, top); // 回到原先的top
  }
}

export default lock;
