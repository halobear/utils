interface Win extends Window {
  mozRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  msRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  mozCancelAnimationFrame?: (handle: number) => void;
  msCancelAnimationFrame?: (handle: number) => void;
  oCancelAnimationFrame?: (handle: number) => void;
}

const win = <Win>window;

export const requestAnimationFrame = (win.requestAnimationFrame =
  win.requestAnimationFrame ||
  win.webkitRequestAnimationFrame ||
  win.mozRequestAnimationFrame ||
  win.msRequestAnimationFrame ||
  (callback => window.setTimeout(callback, 1000 / 60)));

export const cancelAnimationFrame = (win.cancelAnimationFrame =
  win.cancelAnimationFrame ||
  win.webkitCancelAnimationFrame ||
  win.mozCancelAnimationFrame ||
  win.msCancelAnimationFrame ||
  win.oCancelAnimationFrame ||
  (id => clearTimeout(id)));

export default {
  requestAnimationFrame,
  cancelAnimationFrame
};
