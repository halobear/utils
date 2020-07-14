export declare const isIOS: boolean;
export declare const isIphoneX: boolean;
export declare const isWx: boolean;
export declare const isAliPay: boolean;
/**
 * @desc   判断是否pc页面
 * @return {Boolean}
 */
export declare const isPc: boolean;
/**
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export declare function isPhone(str: string): boolean;
/**
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
export declare function isEmail(str: string): boolean;
/**
 * @desc   判断是否是数字
 * @param  {String|Number} str
 * @return {Boolean}
 */
export declare function isNum(str: string): boolean;
/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export declare function isIdCard(str: string): boolean;
/**
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
export declare function isUrl(str: string): boolean;
/**
 * @param url 图片地址
 * @returns {boolean}
 */
export declare function isImage(url: string): boolean;
declare const _default: {
    isIOS: boolean;
    isWx: boolean;
    isAliPay: boolean;
    isPc: boolean;
    isPhone: typeof isPhone;
    isEmail: typeof isEmail;
    isNum: typeof isNum;
    isIdCard: typeof isIdCard;
    isUrl: typeof isUrl;
    isImage: typeof isImage;
};
export default _default;
