interface O {
  "Y+": number;
  "M+": number; //月份
  "D+": number; //日
  "H+": number; //小时
  "m+": number; //分
  "s+": number; //秒
  "q+": number; //季度
  "S+": number; //毫秒
}
type K = keyof O;

function format(
  d: Date | string = new Date(),
  fmt: string = "YYYY-MM-DD HH:mm:ss"
) {
  let date = d instanceof Date ? d : toDate(d);
  const o: O = {
    "Y+": date.getFullYear(),
    "M+": date.getMonth() + 1, //月份
    "D+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S+": date.getMilliseconds() //毫秒
  };
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      if (k == "Y+") {
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      } else if (k == "S+") {
        let lens = RegExp.$1.length;
        lens = lens == 1 ? 3 : lens;
        fmt = fmt.replace(
          RegExp.$1,
          ("00" + o[k]).substr(("" + o[k]).length - 1, lens)
        );
      } else {
        const v: string = `${o[k as K]}`;
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? v : ("00" + v).substr(v.length)
        );
      }
    }
  }
  return fmt;
}

function toDate(s: Date | string) {
  if (s instanceof Date) return s;
  return new Date(
    s
      .replace(/-/g, "/")
      .replace(/(\.\d+)?/g, "")
      .replace("T", " ")
  );
}

export default { format, toDate };
