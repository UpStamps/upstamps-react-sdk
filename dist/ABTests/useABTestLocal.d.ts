export declare const useABTestLocal: (name: string, localStorage?: boolean) => {
    readonly show: boolean;
    readonly error: boolean;
    readonly loading: boolean;
    readonly variant: string;
    readonly emitter: () => Promise<any>;
};
