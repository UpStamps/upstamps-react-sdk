import React, { Fragment, useEffect, useState } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { fetchHandler } from "./shared";

export interface ABTestProps {
  children: React.ReactNode;
}

interface IState {
  component: React.ReactNode;
  loading: boolean;
  error: boolean;
  variant: string;
}

export const ABTest = ({ children }: ABTestProps) => {
  const context = useUpstampsContext();
  const [state, setState] = useState<IState>({
    component: [],
    loading: true,
    error: false,
    variant: "A"
  });

  const { clientId, projectKey, envKey } = context.state.params;
  const url = `${apiUrl}/${clientId}/${projectKey}/${envKey}/testing`;

  const onRenderChildren = (variant: string) => {
    const component = React.Children.map(children, (child: any) => {
      if (child.props.name === variant) {
        return child;
      }
    });

    setState((prevState: IState) => {
      return {
        ...prevState,
        component
      };
    });
  };

  useEffect(() => {
    const onFetch = async () => {
      try {
        const { show, loading, variant } = await fetchHandler(url, name);

        onRenderChildren(variant);

        setState((prevState: IState) => {
          return {
            ...prevState,
            show,
            variant,
            loading
          };
        });
      } catch (e) {
        setState((prevState: IState) => {
          return { ...prevState, error: true, loading: false };
        });
      }
    };
    onFetch();
  }, [name, context.state.params]);

  /* const onEmitter = async () => {
    try {
      return await emitterHandler(state.variant, name, url);
    } catch (e) {
      return e;
    }
  };*/

  /* return React.cloneElement(
    <Fragment />,
    { emitter: onEmitter, ...props },
    <Fragment>{state.component}</Fragment>
  );*/

  return <Fragment>{state.component}</Fragment>;
};

const Variant = ({ children }: { children: React.ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};

Variant.displayName = "ABTest.Variant";

ABTest.Variant = Variant;
