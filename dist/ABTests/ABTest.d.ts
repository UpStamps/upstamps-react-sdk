import React from "react";
export interface ABTestProps {
    children: React.ReactNode;
}
export declare const ABTest: {
    ({ children }: ABTestProps): JSX.Element;
    Variant: {
        ({ children }: {
            children: React.ReactNode;
        }): JSX.Element;
        displayName: string;
    };
};
