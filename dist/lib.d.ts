import type { QRCodeConfig, QRCodeInst, InitQRCodeConfig } from './interface';
export declare const defaultConfig: QRCodeConfig;
export declare function initQRCode(dom: HTMLElement, config: InitQRCodeConfig): QRCodeInst | undefined;
