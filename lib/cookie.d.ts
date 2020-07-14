/**
 * @desc 根据name读取cookie
 * @param  {String} name
 * @return {String} cookie
 */
declare function getCookie(name: string): string;
/**
 * @desc  设置Cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 */
declare function setCookie(name: string, value: string | number, days?: number): void;
/**
 * @desc 根据name删除cookie
 * @param  {String} name
 */
declare function removeCookie(name: string): void;
declare const _default: {
    get: typeof getCookie;
    set: typeof setCookie;
    remove: typeof removeCookie;
};
export default _default;
