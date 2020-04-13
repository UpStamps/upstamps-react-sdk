interface IState {
    loading: boolean;
    error: boolean;
    show: boolean;
}
export declare const useSegment: (name: string, params: {
    country?: string | undefined;
    client?: string | undefined;
    clientType?: string | undefined;
}) => IState | {
    emitter: () => {};
};
export {};
