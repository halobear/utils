interface Doc extends Document {
  selection?: {
    createRange: () => any;
  };
}

interface InputEle extends HTMLInputElement {
  createTextRange?: () => any;
}

/**
 * 获取光标位置
 * @param {HTMLElement} textDom
 */
export function getCursortPosition(textDom: InputEle) {
  let cursorPos = 0;
  const d: Doc = document;
  if (d.selection) {
    // IE Support
    textDom.focus();
    let selectRange = d.selection.createRange();
    selectRange.moveStart("character", -textDom.value.length);
    cursorPos = selectRange.text.length;
  } else if (textDom.selectionStart || textDom.selectionStart === 0) {
    // Firefox support
    cursorPos = textDom.selectionStart;
  }
  return cursorPos;
}

/**
 * 设置光标位置
 * @param {HTMLElement} textDom
 * @param {Number} pos
 */
export function setCursorPosition(textDom: InputEle, pos: number) {
  if (textDom.setSelectionRange) {
    // IE Support
    textDom.focus();
    textDom.setSelectionRange(pos, pos);
  } else if (textDom.createTextRange) {
    // Firefox support
    if (!textDom.createTextRange) return;
    let range = textDom.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}
/**
 * 获取选中文字
 */
export function getSelectText() {
  let userSelection,
    text = "",
    d: Doc = document;
  if (window.getSelection) {
    // Firefox support
    userSelection = window.getSelection();
    text = userSelection ? userSelection.toString() : "";
  } else if (d.selection) {
    // IE Support
    userSelection = d.selection.createRange();
    text = userSelection.text;
  }
  return text;
}

/**
 * 选中特定范围的文本
 * @param {HTMLElement} textDom
 * @param {Number} startPos
 * @param {Number} endPos
 */
export function setSelectText(
  textDom: InputEle,
  startPos: number,
  endPos: number
) {
  startPos = Number(startPos);
  endPos = Number(endPos);
  const textLength = textDom.value.length;
  if (textLength) {
    if (!startPos) {
      startPos = 0;
    }
    if (!endPos) {
      endPos = textLength;
    }
    if (startPos > textLength) {
      startPos = textLength;
    }
    if (endPos > textLength) {
      endPos = textLength;
    }
    if (startPos < 0) {
      startPos = textLength + startPos;
    }
    if (endPos < 0) {
      endPos = textLength + endPos;
    }
    if (textDom.createTextRange) {
      // IE Support
      let range = textDom.createTextRange();
      range.moveStart("character", -textLength);
      range.moveEnd("character", -textLength);
      range.moveStart("character", startPos);
      range.moveEnd("character", endPos);
      range.select();
    } else {
      // Firefox support
      textDom.setSelectionRange(startPos, endPos);
      textDom.focus();
    }
  }
}

/**
 * 在光标后插入文本
 * @param {HTMLElement} textDom
 * @param {String} value
 */
export function insertAfterText(textDom: InputEle, value: string) {
  let selectRange;
  let d: Doc = document;
  if (d.selection) {
    // IE Support
    textDom.focus();
    selectRange = d.selection.createRange();
    selectRange.text = value;
    textDom.focus();
  } else if (textDom.selectionStart || textDom.selectionStart === 0) {
    // Firefox support
    let startPos = textDom.selectionStart || 0;
    let endPos = textDom.selectionEnd || 0;
    let scrollTop = textDom.scrollTop;
    textDom.value =
      textDom.value.substring(0, startPos) +
      value +
      textDom.value.substring(endPos, textDom.value.length);
    textDom.focus();
    ``;
    textDom.selectionStart = startPos + value.length;
    textDom.selectionEnd = startPos + value.length;
    textDom.scrollTop = scrollTop;
  } else {
    textDom.value += value;
    textDom.focus();
  }
}

export default {
  getCursortPosition,
  setCursorPosition,
  getSelectText,
  setSelectText,
  insertAfterText
};

/**
 * https://github.com/ovenslove/vue-mdEditor/blob/master/static/js/rangeFn.js
 */
