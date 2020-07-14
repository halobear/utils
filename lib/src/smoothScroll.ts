import aniFrame from "./animationFrame";
const { requestAnimationFrame } = aniFrame;

/**
 * 动画轨迹
 * @param {Number} t currentTime
 * @param {Number} b start
 * @param {Number} c change
 * @param {Number} d duration
 */
function easeInOut(t: number, b: number, c: number, d: number) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

/**
 * 设置滚动
 * @param {number} top
 */
function move(top: number) {
  document.documentElement.scrollTop = top;
  document.body.scrollTop = top;
}

/**
 * 光滑滚动
 * @param {Number} to 滚动目标距离
 * @param {Number} duration 滚动时间
 * @param {Function} callback
 * @return:
 */
export default (
  to: number,
  duration: number = 150,
  callback: Function | undefined
) => {
  const start = document.documentElement.scrollTop || document.body.scrollTop;
  const change = to - start;
  const increment = 10;
  let currentTime = 0;
  const animateScroll = function() {
    currentTime += increment;
    const val = easeInOut(currentTime, start, change, duration);
    // 设置滚动
    move(val);
    if (currentTime < duration && Math.abs(to - start) > 2) {
      requestAnimationFrame(animateScroll);
    } else {
      typeof callback === "function" && callback();
    }
  };
  animateScroll();
};
