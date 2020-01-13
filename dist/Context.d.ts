import React from "react";
export interface UpStampsState {
    name: string;
    flags: Array<string>;
}
export interface UpStampsContextState {
    state: UpStampsState;
}
export interface UpStampsProviderProps {
    children: React.ReactNode;
}
export declare const UpStampsContext: React.Context<UpStampsContextState>;
export declare const UpStampsProvider: React.FC<UpStampsProviderProps>;
