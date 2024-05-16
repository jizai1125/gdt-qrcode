import type { QRCodeConfig } from './interface';
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToOption<QRCodeConfig>, QRCodeConfig>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    scanned: (code: string, data: object) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<QRCodeConfig>, QRCodeConfig>>> & {
    onScanned?: ((code: string, data: object) => any) | undefined;
}, {
    clientId: string;
    redirectUri: string;
    url: string | ((config: QRCodeConfig) => string);
    domain: string;
    width: string | number;
    height: string | number;
    blockLine: boolean;
    showLogo: boolean;
    onlyShowCode: boolean;
    onScanned: (code: string, data: object) => void;
}, {}>;
export default _default;

type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
