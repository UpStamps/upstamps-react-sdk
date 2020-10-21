import { IState } from "./types";
export declare const useABTest: (name: string) => IState | {
    emitter: () => {};
};
