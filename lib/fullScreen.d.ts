/**
 * @description: 是否全屏
 * @return: Boolean
 */
declare function isFullScreen(): boolean;
/**
 * @description: 设置全屏
 */
declare function setFullScreen(): void;
/**
 * @description: 关闭全屏
 */
declare function closeFullScreen(): void;
/**
 * @description: 切换全屏
 */
declare function toggleFullScreen(): void;
declare const _default: {
    is: typeof isFullScreen;
    set: typeof setFullScreen;
    close: typeof closeFullScreen;
    toggle: typeof toggleFullScreen;
};
export default _default;
