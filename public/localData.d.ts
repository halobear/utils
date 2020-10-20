/**
 * 设置localStorage过期时间
 * @param key{string}
 * @param value{string}
 * @param maxAge{number} 分钟 (默认7天)
 */
declare function setLocalData(key: string, value: any, maxAge?: number): void;
/**
 * 获取本地localData
 * @param key{string}
 */
declare function getLocalData(key: string): any;
/**
 * 删除本地localData
 * @param key{string}
 */
declare function clearLocalData(key: string): void;
/**
 * 创建localStorage缓存,用于用户信息
 * @param key{string}
 * @param maxAge{number} 分钟 (默认1天)
 */
declare function createCache(key: string, maxAge?: number): {
    get(): any;
    set(data: any): void;
    clear(): void;
};
declare const _default: {
    get: typeof getLocalData;
    set: typeof setLocalData;
    clear: typeof clearLocalData;
    create: typeof createCache;
};
export default _default;
