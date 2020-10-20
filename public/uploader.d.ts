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
/**
 * @description: 获取文件md5值
 * @param {fileObject} file 文件对象
 * @param {Function} processFn 读取md5进度
 * @return:
 */
export declare function getFileMD5(file: File, processFn: Function | undefined): Promise<unknown>;
/**
 * @description: js触发获取文件
 * @param {String} accept 文件类型
 * @param {Boolean} multiple 是否多选
 */
export declare function selectFile({ accept, multiple }: {
    accept?: string | undefined;
    multiple?: boolean | undefined;
}): Promise<FileList | null>;
/**
 * @description: 获取文件
 * @param {String} accept 获取文件类型
 * @param {Boolean} multiple 是否上传多张图片
 * @param {Boolean} needMD5 是否获取文件md5
 * @param {Function} readProcess 获取md5值进度
 * @return: Promise={file, md5}
 */
export declare function getFiles(options: Options): Promise<{
    file: File;
    md5: unknown;
    name: string;
}[]>;
/**
 * @description: 单个获取文件
 */
export declare function getFile(o: Options): Promise<{
    file: File;
    md5: unknown;
    name: string;
}>;
/**
 * @description: 上传文件
 * @param {String} url 上传地址
 * @param {FormData} data 上传对象
 * @param {withCredentials} Boolean 是否携带cookie
 * @param {Function} 进度
 * @return: Promise
 */
export declare function upload({ url, data, onProgress, toast, withCredentials }: UploadOptions): Promise<unknown>;
export {};
