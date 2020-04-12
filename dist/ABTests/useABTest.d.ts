interface IState {
    loading: boolean;
    error: boolean;
    show: boolean;
    variant: string;
}
export declare const useABTest: (name: string) => IState | {
    emitter: () => {};
};
export {};
