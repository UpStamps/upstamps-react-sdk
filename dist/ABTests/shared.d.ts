export declare const variantTypes: string[];
export declare const fetchHandler: (url: string, name: string) => Promise<{
    show: boolean;
    variant: string;
    loading: boolean;
}>;
export declare const emitterHandler: (variant: string, name: string, url: string) => Promise<any>;
