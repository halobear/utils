interface ExportVconsole {
    _vConsole: any;
    init(src: string): void;
    show(src: string): void;
    hide(): void;
}
declare const exportVconsole: ExportVconsole;
export default exportVconsole;
