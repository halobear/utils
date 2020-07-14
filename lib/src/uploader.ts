/*
 * @Description: 图片上传
 * @Author: your name
 */

import SparkMD5 from "spark-md5";

interface FP {
  mozSlice?: (
    start?: number | undefined,
    end?: number | undefined,
    contentType?: string | undefined
  ) => Blob;
  webkitSlice?: (
    start?: number | undefined,
    end?: number | undefined,
    contentType?: string | undefined
  ) => Blob;
  [x: string]: any;
}
interface UserError extends Error {
  response: object;
}
interface Options {
  multiple?: boolean;
  accept?: string;
  needMD5?: boolean;
  readProcess: Function | undefined;
}
interface UploadOptions {
  url: string;
  data: FormData;
  onProgress: Function | undefined;
  toast: Function | undefined;
  withCredentials: boolean;
}

interface fileEveTarget extends EventTarget {
  result?: ArrayBuffer;
}

/**
 * @description: 获取文件md5值
 * @param {fileObject} file 文件对象
 * @param {Function} processFn 读取md5进度
 * @return:
 */
export function getFileMD5(file: File, processFn: Function | undefined) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader(); //分块读取文件对象
    // file的slice方法，注意它的兼容性，在不同浏览器的写法不同
    const p: FP = File.prototype;
    const blobSlice = p.slice || p.mozSlice || p.webkitSlice;

    const chunkSize = 10 * 1024 * 1024; //分块大小，20M
    const chunks = Math.ceil(file.size / chunkSize); //总块数
    let currentChunk = 0; //当前块数
    const spark = new SparkMD5(); //获取MD5对象

    fileReader.onload = e => {
      const t = e.target as fileEveTarget;
      const result = t.result || "";
      //数据加载完毕事件
      let binaryStr = "";
      const bytes = result instanceof ArrayBuffer ? new Uint8Array(result) : "";
      const length = bytes ? bytes.byteLength : 0;
      for (let i = 0; i < length; i++) {
        binaryStr += String.fromCharCode(Number(bytes[i])); //二进制转换字符串
      }
      spark.appendBinary(binaryStr);
      currentChunk++;
      if (processFn) {
        processFn(`${Math.ceil((currentChunk / chunks) * 100)}%`);
      } else {
        console.log("读取文件", `${Math.ceil((currentChunk / chunks) * 100)}%`);
      }
      if (currentChunk < chunks) {
        loadNext(); //读取下一块数据
      } else {
        const fileMd5 = spark.end(); //得到文件MD5值
        resolve(fileMd5);
      }
    };
    fileReader.onerror = e => {
      reject(e);
    };

    function loadNext() {
      const start = currentChunk * chunkSize;
      const end =
        start + chunkSize >= file.size ? file.size : start + chunkSize;
      //根据开始和结束位置，切割文件
      const b = blobSlice.call(file, start, end);
      //readAsBinaryString ie浏览器不兼容此方法
      //fileReader.readAsBinaryString(blobSlice.call(file, start, end));
      fileReader.readAsArrayBuffer(b); //ie，chrome，firefox等主流浏览器兼容此方法
    }
    loadNext();
  });
}

/**
 * @description: js触发获取文件
 * @param {String} accept 文件类型
 * @param {Boolean} multiple 是否多选
 */
export function selectFile({
  accept = "image/*",
  multiple = false
}): Promise<FileList | null> {
  const id = "kuan-upload-input";
  let _input = document.getElementById(id) as HTMLInputElement;
  if (!_input) {
    _input = document.createElement("input");
    _input.id = id;
    _input.type = "file";
    _input.style.display = "none";
    document.body.appendChild(_input);
  }
  _input.value = "";
  _input.accept = accept;
  _input.multiple = multiple;

  _input.click();

  return new Promise(resolve => {
    if (!_input) return resolve(null);
    _input.onchange = () => {
      const files = (_input as HTMLInputElement).files;
      if (files && files.length) {
        resolve(files);
      }
    };
  });
}

/**
 * @description: 获取文件
 * @param {String} accept 获取文件类型
 * @param {Boolean} multiple 是否上传多张图片
 * @param {Boolean} needMD5 是否获取文件md5
 * @param {Function} readProcess 获取md5值进度
 * @return: Promise={file, md5}
 */
export async function getFiles(options: Options) {
  const {
    multiple = true,
    accept = "image/*",
    needMD5 = true,
    readProcess = () => {}
  } = options || {};
  const files: FileList | null = await selectFile({
    multiple,
    accept
  });
  if (!files) return [];
  const res = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i] as File;
    let md5;
    if (needMD5) {
      md5 = await getFileMD5(file, readProcess);
    } else {
      md5 = new Date().getTime();
    }
    const suffix = file.name.substring(
      file.name.lastIndexOf(".") || 0,
      file.name.length
    );
    res.push({
      file,
      md5,
      name: md5 + suffix
    });
  }
  return res;
}
/**
 * @description: 单个获取文件
 */
export async function getFile(o: Options) {
  const options: Options = o || {};
  options.multiple = false;
  const [item] = await getFiles(options);
  return item;
}

/**
 * @description: 上传文件
 * @param {String} url 上传地址
 * @param {FormData} data 上传对象
 * @param {withCredentials} Boolean 是否携带cookie
 * @param {Function} 进度
 * @return: Promise
 */
export function upload({
  url,
  data,
  onProgress,
  toast = alert,
  withCredentials = false
}: UploadOptions) {
  return new Promise((resolve, reject) => {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    if (!xhr.upload) return reject(new Error("xhr no upload methods"));
    xhr.upload.addEventListener(
      "progress",
      e => {
        if (onProgress)
          onProgress({
            data,
            loaded: e.loaded,
            total: e.total
          });
      },
      false
    );
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } catch (e) {
            resolve(xhr.responseText);
          }
        } else {
          const msg = `发生错误 ${xhr.status}`;
          const err = new Error(msg) as UserError;
          err.response = xhr;
          toast(msg);
          reject(err);
        }
      }
    };
    xhr.withCredentials = withCredentials || false;
    xhr.open("POST", url, true);
    xhr.send(data as FormData);
  });
}

export default {
  getFileMD5,
  getFiles,
  getFile,
  upload
};
