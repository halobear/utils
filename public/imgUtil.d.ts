/**
 * 预加载图片
 * @params {array} images 图片地址
 */
export declare function preloadImage(srcArr?: string[]): Promise<string[]>;
/**
 * @description: 获取本地图片文件尺寸
 * @param {File} file
 * @return: Promise<{widh: string, height: string}>
 */
export declare function getFileImageSize(file: File): Promise<{
    width: number;
    height: number;
} | null>;
