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
    params: UpStampsConfigParams;
}
export interface UpStampsContextState {
    state: UpStampsState;
}
export interface UpStampsProviderProps extends UpStampsConfigParams {
    children: React.ReactNode;
}
export declare const UpStampsContext: React.Context<UpStampsContextState>;
export declare const UpStampsProvider: React.FC<UpStampsProviderProps>;
