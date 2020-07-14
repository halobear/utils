interface InputEle extends HTMLInputElement {
    createTextRange?: () => any;
}
/**
 * 获取光标位置
 * @param {HTMLElement} textDom
 */
export declare function getCursortPosition(textDom: InputEle): number;
/**
 * 设置光标位置
 * @param {HTMLElement} textDom
 * @param {Number} pos
 */
export declare function setCursorPosition(textDom: InputEle, pos: number): void;
/**
 * 获取选中文字
 */
export declare function getSelectText(): string;
/**
 * 选中特定范围的文本
 * @param {HTMLElement} textDom
 * @param {Number} startPos
 * @param {Number} endPos
 */
export declare function setSelectText(textDom: InputEle, startPos: number, endPos: number): void;
/**
 * 在光标后插入文本
 * @param {HTMLElement} textDom
 * @param {String} value
 */
export declare function insertAfterText(textDom: InputEle, value: string): void;
declare const _default: {
    getCursortPosition: typeof getCursortPosition;
    setCursorPosition: typeof setCursorPosition;
    getSelectText: typeof getSelectText;
    setSelectText: typeof setSelectText;
    insertAfterText: typeof insertAfterText;
};
export default _default;
/**
 * https://github.com/ovenslove/vue-mdEditor/blob/master/static/js/rangeFn.js
 */
