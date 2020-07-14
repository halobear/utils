/**
 * @desc 随机生成颜色
 * @return {String}
 */
function random(): string {
  return (
    "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
  );
}
/**
 * rgb to hex
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @return {string} hex
 */
function rgb2hex(r: number, g: number, b: number): string {
  const rgb = b | (g << 8) | (r << 16);
  return "#" + (0x1000000 + rgb).toString(16).slice(1);
}

/**
 * hexo to rgb
 * @param {string} hex
 * @return {string} rgb
 */

function hex2rgb(hex: string): string {
  if (!/^#?([0-9a-fA-F]{3}|[#-9a-fA-F]{6})$/.test(hex)) return "";
  let str = hex.replace("#", "");
  if (str.length === 3) {
    str = str
      .split("")
      .map(v => v + v)
      .join("");
  }
  const n = parseInt(str, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;

  return r + "," + g + "," + b;
}

export default {
  random,
  rgb2hex,
  hex2rgb
};
