interface FsDocument extends HTMLDocument {
  webkitIsFullScreen?: Element;
  mozIsFullScreen?: Element;
  msIsFullScreen?: Element;
  webkitExitFullscreen?: () => void;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
}

interface FsDocumentElement extends HTMLElement {
  webkitRequestFullscreen?: () => void;
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
}

/**
 * @description: 是否全屏
 * @return: Boolean
 */
function isFullScreen(): boolean {
  const fsDoc = <FsDocument>document;
  return !!(
    fsDoc.fullscreen ||
    fsDoc.webkitIsFullScreen ||
    fsDoc.mozIsFullScreen ||
    fsDoc.msIsFullScreen
  );
}

/**
 * @description: 设置全屏
 */
function setFullScreen(): void {
  if (isFullScreen()) return;
  const ele = <FsDocumentElement>document.documentElement;
  const requestFullscreen =
    ele.requestFullscreen ||
    ele.webkitRequestFullscreen ||
    ele.msRequestFullscreen ||
    ele.mozRequestFullScreen ||
    null;
  requestFullscreen && requestFullscreen.call(ele);
}

/**
 * @description: 关闭全屏
 */
function closeFullScreen(): void {
  if (!isFullScreen()) return;
  const doc = <FsDocument>document;
  const exitFullscreen =
    doc.exitFullscreen ||
    doc.msExitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    null;
  exitFullscreen && exitFullscreen.call(doc);
}

/**
 * @description: 切换全屏
 */
function toggleFullScreen(): void {
  if (isFullScreen()) {
    closeFullScreen();
  } else {
    setFullScreen();
  }
}

export default {
  is: isFullScreen,
  set: setFullScreen,
  close: closeFullScreen,
  toggle: toggleFullScreen
};
