interface Obj {
    [key: string]: string;
}
/**
 *
 * @param name {string}
 * @param search {string}  [a=1&b=2]
 * @returns {string || null}
 */
export declare function get(name: string, search?: string): string | null;
/**
 * @desc   url参数转对象
 * @param  {String} search  default: window.location.href
 * @return {Object}
 */
export declare function parse(search?: string): Obj;
/**
 * @desc   对象序列化
 * @param  {Object} obj
 * @return {String}
 */
export declare function stringify(obj: Obj): string;
declare const _default: {
    get: typeof get;
    parse: typeof parse;
    stringify: typeof stringify;
};
export default _default;
