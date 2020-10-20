/**
 * @description: 根据地址下载
 * @param {String} href
 * @param {String} name
 */
export declare function download(href: string, name?: string): void;
/**
 * @description: 下载blob对象
 * @param {Blob} blob
 * @param {String} name
 */
export declare function downloadBlob(blob: Blob, name: string): void;
/**
 * @description: 下载文字
 * @param {String} str
 * @param {String} name
 */
export declare function downloadStr(str: string, name: string): void;
/**
 * @description: 下载图片
 * @param {String} src
 * @param {String} name
 */
export declare function downloadImage(src: string, name?: string): void;
