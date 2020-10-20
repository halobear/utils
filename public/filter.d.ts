/**
 * @desc 隐藏手机号
 * @param {*} str
 * @returns {string}
 */
export declare function hidePhone(phone?: string | number): string;
/**
 * @desc 获取字符串字节
 * @param {*} str
 * @returns {number}
 */
export declare function byteSize(str: string): number;
/**
 * @desc html转化防止xs攻击
 * @params str {string}
 * @returns {string}
 */
export declare function htmlEncode(str?: string): string;
/**
 * @desc 格式化货币
 * @param num {string || number}
 * @returns {string}
 */
export declare function formatCurrency(num: number | string): string;
/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */
export declare function timeAgo(startTime: Date | string): string;
/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
export declare function remainTime(endTime: Date | string): string;
