export declare const handleFetch: (url: string, name: string, params: {
    country?: string | undefined;
    client?: string | undefined;
    clientType?: string | undefined;
}) => Promise<{
    segment: any;
    show: boolean;
    loading: boolean;
}>;
