/// <reference types="react" />
export interface ABTestProps {
    children: React.ReactNode;
    testRef: React.RefObject<any>;
    name: string;
}
export interface IState {
    component: React.ReactNode;
    loading: boolean;
    error: boolean;
    variant: string;
    show: boolean;
}
export interface ContainerProps {
    children: React.ReactNode;
    emitter: () => {};
}
