interface XlxsOption {
    name: string;
    data: {
        [x: string]: string;
    }[];
    header: {
        [x: string]: string;
    };
    skipHeader: boolean;
}
declare const _default: {
    JSONToExcel: (dataConfig: XlxsOption) => void;
    excelToJSON: (file: File) => Promise<unknown> | undefined;
};
export default _default;
