/**
 * @description: rem适配，以设计稿750px、字体大小100px为标准
 * @param {Number}
 */
export default (size: number = 750) => {
  if (typeof window === "undefined") return;

  function adjust() {
    document.documentElement.style.fontSize =
      Math.min(100, 100 * (document.documentElement.clientWidth / size)) + "px";
  }

  adjust();
  window.addEventListener(
    "orientationchange" in window ? "orientationchange" : "resize",
    adjust,
    true
  );
};
