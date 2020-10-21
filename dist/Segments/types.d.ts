/// <reference types="react" />
export interface IState {
    loading: boolean;
    error: boolean;
    show: boolean;
}
export interface SegmentProps {
    children: React.ReactNode;
    name: string;
    params: {
        country?: string;
        client?: string;
        clientType?: string;
    };
}
export interface SegmentLocalProps extends SegmentProps {
    localStorage: boolean;
}
export interface Params {
    country?: string;
    client?: string;
    clientType?: string;
}
export interface IStorageData extends IState {
    params: Params;
}
