export declare const useSegment: (name: string, params: {
    country?: string | undefined;
    client?: string | undefined;
    clientType?: string | undefined;
}, localStorage?: boolean) => {
    readonly show: boolean;
    readonly error: boolean;
    readonly loading: boolean;
};
