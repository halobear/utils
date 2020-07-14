/**
 * @desc 随机生成颜色
 * @return {String}
 */
declare function random(): string;
/**
 * rgb to hex
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @return {string} hex
 */
declare function rgb2hex(r: number, g: number, b: number): string;
/**
 * hexo to rgb
 * @param {string} hex
 * @return {string} rgb
 */
declare function hex2rgb(hex: string): string;
declare const _default: {
    random: typeof random;
    rgb2hex: typeof rgb2hex;
    hex2rgb: typeof hex2rgb;
};
export default _default;
