/**
 * 预加载图片
 * @params {array} images 图片地址
 */
declare function preload(srcArr?: string[]): Promise<string[]>;
/**
 * @description: 获取本地图片文件尺寸
 * @param {File} file
 * @return: Promise<{widh: string, height: string}>
 */
declare function fileInfo(file: File): Promise<{
    width: number;
    height: number;
} | null>;
declare const _default: {
    preload: typeof preload;
    fileInfo: typeof fileInfo;
};
export default _default;
