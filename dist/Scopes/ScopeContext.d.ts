import React from "react";
export interface ScopesConfigParams {
    name?: string | null;
    email: string;
}
export interface ScopesState {
    loading: boolean;
    error: boolean;
    params: ScopesConfigParams;
}
export interface ScopesContextState {
    state: ScopesState;
}
export interface ScopesProviderProps extends ScopesConfigParams {
    children: React.ReactNode;
}
export declare type ReducerSetScope = {
    type: "set-scope";
    payload: {
        success: boolean;
        loading: boolean;
    };
};
export declare type ReducerSetScopeError = {
    type: "set-scope-error";
    payload: {
        error: boolean;
        loading: boolean;
    };
};
export declare type ReducerScopeActions = ReducerSetScope | ReducerSetScopeError;
export declare const ScopesContext: React.Context<ScopesContextState>;
export declare const ScopesProvider: React.FC<ScopesProviderProps>;
