import React from "react";
interface Params {
    country?: string;
    client?: string;
    clientType?: string;
}
export interface SegmentProps extends Params {
    children: React.ReactNode;
    name: string;
    params: Params;
    localStorage?: boolean;
}
export declare const Segment: React.FC<SegmentProps>;
export {};
