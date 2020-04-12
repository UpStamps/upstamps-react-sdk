import React from "react";
export interface UpStampsConfigParams {
    clientId: string;
    envKey: string;
    projectKey: string;
}
export interface UpStampsState {
    loading: boolean;
    error: boolean;
    flags: Array<string>;
    remotes: Array<{
        name: string;
        data: {};
    }>;
    params: UpStampsConfigParams;
}
export interface UpStampsContextState {
    state: UpStampsState;
}
export interface UpStampsProviderProps extends UpStampsConfigParams {
    children: React.ReactNode;
}
export declare type ReducerSetFlags = {
    type: "set-flags";
    payload: {
        flags: Array<string>;
        loading: boolean;
    };
};
export declare type ReducerSetFlagsError = {
    type: "set-flags-error";
    payload: {
        error: boolean;
        loading: boolean;
    };
};
export declare type ReducerSetRemotes = {
    type: "set-remotes";
    payload: {
        remotes: Array<{
            name: string;
            data: {};
        }>;
        loading: boolean;
    };
};
export declare type ReducerSetRemotesError = {
    type: "set-remotes-error";
    payload: {
        error: boolean;
        loading: boolean;
    };
};
export declare type ReducerActions = ReducerSetFlags | ReducerSetFlagsError | ReducerSetRemotes | ReducerSetRemotesError;
export declare const UpStampsContext: React.Context<UpStampsContextState>;
export declare const UpStampsProvider: React.FC<UpStampsProviderProps>;
