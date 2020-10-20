interface Obj {
  [key: string]: any;
}
type K = keyof Obj;
function setValue(obj: Obj, k: K, v: any) {
  obj[k] = v;
}

/**
 * @desc 深拷贝，支持常见类型
 * @param {any} values
 */
function deepClone(values: any): any {
  let copy;

  if (values === null || typeof values !== "object") return values;

  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }

  if (values instanceof Array) {
    copy = [];
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }
    return copy;
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {};
    for (const attr in values) {
      if (values.hasOwnProperty(attr)) {
        setValue(copy, attr, deepClone(values[attr]));
      }
    }
    return copy;
  }

  throw new Error("deep clone isn't supported.");
}

export default deepClone;
