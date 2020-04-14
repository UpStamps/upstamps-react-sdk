import React from "react";
export interface SegmentProps {
    children: React.ReactNode;
    name: string;
    params: {
        country?: string;
        client?: string;
        clientType?: string;
    };
}
export declare const Segment: React.FC<SegmentProps>;
