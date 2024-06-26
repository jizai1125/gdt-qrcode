export declare function addUrlQueryParams(url: string, params: Record<string, any>, skipNullOrUndefined?: boolean): string;
export declare function formatLength<T extends number | string | null | undefined | any>(value: unknown, suffix?: string): T extends null ? null : T extends undefined ? undefined : T extends string | number ? string : T;
