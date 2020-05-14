import React from "react";
export interface ABTestProps {
    children: React.ReactNode;
    testRef: React.RefObject<any>;
    name: string;
    localStorage?: boolean;
}
export declare const ABTest: {
    ({ children, name, testRef, localStorage }: ABTestProps): JSX.Element | null;
    Variant: {
        ({ children, name }: {
            children: React.ReactNode;
            name: string;
        }): React.FunctionComponentElement<any>;
        displayName: string;
    };
};
