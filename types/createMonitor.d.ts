/**
 * 前端监控
 */
declare namespace ErrorMonitor {
    interface OtherData {
        [x: string]: string;
    }
    export interface Settings {
        id: string;
        uin: string;
        reportUrl?: string;
        otherData?: OtherData;
    }
    export interface NewLog {
        msg: string;
        target: string | undefined;
        rowNum: number;
        colRow: number;
        from?: string;
    }
    export {};
}
declare class ErrorReportHandler {
    private timer;
    private settings;
    private logs;
    constructor(options: ErrorMonitor.Settings);
    private handleError;
    sendError(): void;
}
declare const _default: (settings: ErrorMonitor.Settings) => ErrorReportHandler;
export default _default;
