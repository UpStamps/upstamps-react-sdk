
import React from "react";

export interface ABTestProps {
    children: React.ReactNode;
    testRef: React.RefObject<any>;
    name: string;
   
  }

  export interface ABTestLocalProps extends ABTestProps {
    localStorage: boolean
  }
  
  export interface IState {
    component?: React.ReactNode;
    loading: boolean;
    error: boolean;
    variant: string;
    show: boolean;
  }
  
export interface ContainerProps {
    children: React.ReactNode;
    emitter: () => {};
}