export interface QRCodeInst {
    config: QRCodeConfig;
    dom: HTMLElement;
    domClassName: string;
    style: HTMLStyleElement | undefined;
    iframe: HTMLIFrameElement | undefined;
    url: string | undefined;
    render: () => void;
    update: (config?: QRCodeConfig) => void;
    updateUrl: (url?: string) => void;
    updateStyle: (config?: QRCodeStyleConfig) => void;
    messageHandler: (event: MessageEvent) => void;
}
export interface QRCodeConfig {
    clientId?: string;
    redirectUri?: string;
    domain?: string;
    url?: string | ((config: QRCodeConfig) => string);
    width?: number;
    height?: number;
    showLogo?: boolean;
    onlyShowCode?: boolean;
    onScanned?: (code: string, data: object) => void;
}
type QRCodeStyleConfig = Omit<QRCodeConfig, 'clientId' | 'redirectUri' | 'url'>;
type InitQRCodeConfig = MakeRequired<QRCodeConfig, 'clientId' | 'redirectUri'>;
type MakeRequired<T, K extends keyof T = never> = {
    [P in K]-?: T[P];
} & {
    [P in keyof Omit<T, K>]: T[P];
};
export declare const defaultConfig: QRCodeConfig;
export declare function initQRCode(dom: HTMLElement, config: InitQRCodeConfig): QRCodeInst | undefined;
export {};
