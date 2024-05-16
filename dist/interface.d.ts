export interface QRCodeInst {
    config: QRCodeConfig;
    dom: HTMLElement;
    domClassName: string;
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
    width?: number | string;
    height?: number | string;
    blockLine?: boolean;
    showLogo?: boolean;
    onlyShowCode?: boolean;
    onScanned?: (code: string, data: object) => void;
}
export type QRCodeStyleConfig = Omit<QRCodeConfig, 'clientId' | 'redirectUri' | 'url'>;
export type InitQRCodeConfig = MakeRequired<QRCodeConfig, 'clientId' | 'redirectUri'>;
type MakeRequired<T, K extends keyof T = never> = {
    [P in K]-?: T[P];
} & {
    [P in keyof Omit<T, K>]: T[P];
};
export {};
