declare namespace xlsxOptions {
    interface item {
        [x: string]: string;
    }
    interface options {
        name: string;
        data: item[];
        header: item;
        skipHeader: boolean;
    }
    interface fileEveTarget extends EventTarget {
        result?: ArrayBuffer;
    }
}
/**
 * json导出excel
 * @param name：文件名字，string
 * @param data： 内容： array
 * @param header： 标题： Object{key: 对应名字}
 * @param skipHeader: 是否隐藏头部
 */
export declare const JSONToExcel: (options: xlsxOptions.options) => Promise<void>;
export declare const excelToJSON: (file: File) => Promise<unknown>;
declare const _default: {
    JSONToExcel: (options: xlsxOptions.options) => Promise<void>;
    excelToJSON: (file: File) => Promise<unknown>;
};
export default _default;
