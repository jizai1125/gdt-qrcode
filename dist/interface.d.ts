export interface QRCodeInst {
    dom: HTMLElement | undefined;
    domClassName: string;
    iframe: HTMLIFrameElement | undefined;
    url: string | undefined;
    options: QRCodeOptions;
    render: () => void;
    update: (options?: QRCodeOptions) => void;
    updateUrl: (url?: string) => void;
    updateStyle: (options?: QRCodeOptions) => void;
    destroy: () => void;
}
export interface QRCodeOptions {
    clientId?: string;
    redirectUri?: string;
    domain?: string;
    url?: string | ((options: QRCodeOptions) => string);
    width?: number | string;
    height?: number | string;
    blockLine?: boolean;
    showLogo?: boolean;
    onlyShowCode?: boolean;
    onScanned?: (code: string, data: object) => void;
}
export type QRCodeStyleOptions = Omit<QRCodeOptions, 'clientId' | 'redirectUri' | 'url'>;
export type InitQRCodeOptions = MakeRequired<QRCodeOptions, 'clientId' | 'redirectUri'>;
type MakeRequired<T, K extends keyof T = never> = {
    [P in K]-?: T[P];
} & {
    [P in keyof Omit<T, K>]: T[P];
};
export {};
