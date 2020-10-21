import React from "react";
import { ABTestProps } from "./types";
export declare const ABTest: {
    ({ children, name, testRef }: ABTestProps): JSX.Element | null;
    Variant: {
        ({ children, name }: {
            children: React.ReactNode;
            name: string;
        }): React.FunctionComponentElement<any>;
        displayName: string;
    };
};
