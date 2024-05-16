import type { QRCodeOptions, QRCodeStyleOptions, InitQRCodeOptions } from './interface';
export declare const defaultOptions: QRCodeOptions;
export declare class GdtQRCode {
    dom: HTMLElement | undefined;
    domClassName: string;
    options: QRCodeOptions;
    iframe: HTMLIFrameElement | undefined;
    url: string | undefined;
    constructor(dom: HTMLElement, options: InitQRCodeOptions);
    render(options?: QRCodeOptions): void;
    update(options?: QRCodeOptions): void;
    updateOptions(options?: QRCodeOptions): QRCodeOptions;
    updateUrl(url?: string): void;
    updateStyle(options?: QRCodeStyleOptions): void;
    destroy(): void;
    private formatUrl;
    private offMessage;
    private registerMessage;
    private messageHandler;
}
