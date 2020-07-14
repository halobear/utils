interface CStyle {
  visibility: string;
  display: string;
  [x: string]: string;
}

export default function eleSize(elem: HTMLElement) {
  let width,
    height,
    noneNodes: HTMLElement[] = [],
    nodeStyle: CStyle[] = [];
  getNoneNode(elem); //获取多层display：none;的元素
  setNodeStyle();
  width = elem.clientWidth;
  height = elem.clientHeight;
  resumeNodeStyle();

  return {
    width: width,
    height: height
  };

  function getNoneNode(node: HTMLElement) {
    if (!node) return;
    let display = getStyles(node).getPropertyValue("display"),
      tagName = node.nodeName.toLowerCase();
    if (display != "none" && tagName != "body") {
      getNoneNode(<HTMLElement>node.parentNode);
    } else {
      noneNodes.push(node);
      if (tagName != "body") getNoneNode(<HTMLElement>node.parentNode);
    }
  }

  //这方法才能获取最终是否有display属性设置，不能style.display。
  function getStyles(elem: HTMLElement) {
    // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    let view = elem.ownerDocument && elem.ownerDocument.defaultView;

    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  }

  function setNodeStyle() {
    let i = 0;
    for (; i < noneNodes.length; i++) {
      let visibility = noneNodes[i].style.visibility || "",
        display = noneNodes[i].style.display || "",
        style = noneNodes[i].getAttribute("style");
      //覆盖其他display样式
      noneNodes[i].setAttribute(
        "style",
        "visibility:hidden;display:block !important;" + style
      );
      nodeStyle[i] = {
        visibility: visibility,
        display: display
      };
    }
  }

  function resumeNodeStyle() {
    for (let i = 0; i < noneNodes.length; i++) {
      const cStyle = nodeStyle[i];
      const { visibility, display } = cStyle;
      noneNodes[i].style.visibility = visibility;
      noneNodes[i].style.display = display;
    }
  }
}
