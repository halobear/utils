interface D {
  el: HTMLElement;
  change: Function;
  parentNode: HTMLElement;
}

// parentNode 设置document.body全屏拖拽
export default class Drag {
  parentNode: D["parentNode"];
  onchange: D["change"];
  constructor(
    public el: D["el"],
    onchange: D["change"] = () => {},
    parentNode?: D["parentNode"]
  ) {
    this.el = el;
    this.parentNode = parentNode || el.parentElement || document.body;
    this.onchange = onchange;
    this.init(el, onchange);
  }
  init(el: D["el"], onchange: D["change"]) {
    this.el = el;
    el.style.position = "absolute";
    el.style.cursor = "grab";
    if (!this.parentNode) return;
    const maxLeft = this.parentNode.clientWidth - el.clientWidth;
    const maxTop = this.parentNode.clientHeight - el.clientHeight;
    el.onmousedown = function(e) {
      el.style.cursor = "grabbing";
      const disX = e.clientX - el.offsetLeft;
      const disY = e.clientY - el.offsetTop;
      document.onmousemove = function(e) {
        //  获取到鼠标拖拽后的横向位移(距离父级元素)
        const l = e.clientX - disX;
        //  获取到鼠标拖拽后的纵向位移(距离父级元素)
        const t = e.clientY - disY;

        if (!el.style) return;
        el.style.left = l + "px";
        el.style.top = t + "px";

        if (e.clientX - disX <= 0) {
          el.style.left = 0 + "px";
        } else if (e.clientX - disX >= maxLeft) {
          el.style.left = maxLeft + "px";
        }

        if (e.clientY - disY <= 0) {
          el.style.top = 0 + "px";
        } else if (e.clientY - disY >= maxTop) {
          el.style.top = maxTop + "px";
        }

        return false;
      };

      // 松开事件后，移除事件
      document.onmouseup = function() {
        // 将此时的位置传出去
        document.onmousemove = null;
        document.onmouseup = null;
        if (el && el.style) {
          el.style.cursor = "grab";
          onchange({
            x: el.style.left ? el.style.left.replace("px", "") : 0,
            y: el.style.top ? el.style.top.replace("px", "") : 0
          });
        }
      };
    };
  }
  destroy() {
    const el: D["el"] = this.el;
    if (el && el.onmousedown) {
      el.onmousedown = () => {};
    }
  }
}
