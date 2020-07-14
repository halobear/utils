/**
 * 锁定滚动
 * @param key{string}
 * @param value{string}
 * @param maxAge{number} 分钟 (默认7天)
 */
declare function lock(shouldLock?: boolean): void;
export default lock;
