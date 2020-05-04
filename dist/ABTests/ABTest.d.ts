import React from "react";
export interface ABTestProps {
    children: React.ReactNode;
    testRef: React.RefObject<any>;
    name: string;
}
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
