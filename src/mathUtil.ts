/**
 * 加
 * @param {number} arg1
 * @param {number} arg2
 */
export function add(arg1: number, arg2: number) {
  let r1, r2;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  const c = Math.abs(r1 - r2);
  const m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    const cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
}

/**
 * 减
 * @param {number} arg1
 * @param {number} arg2
 */
export function sub(arg1: number, arg2: number) {
  let r1, r2;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka 动态控制精度长度
  const n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 乘
 * @param {number} arg1
 * @param {number} arg2
 */
export function mul(arg1: number, arg2: number) {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

/**
 * 除
 * @param {number} arg1
 * @param {number} arg2
 */
export function div(arg1: number, arg2: number) {
  let t1 = 0,
    t2 = 0;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  const r1 = Number(arg1.toString().replace(".", ""));
  const r2 = Number(arg2.toString().replace(".", ""));
  return r1 / (r2 * 10 ** (t1 - t2));
}

export default {
  add,
  sub,
  mul,
  div
};
