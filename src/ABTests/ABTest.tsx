import React, { Fragment, useEffect, useState } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { fetchHandler, emitterHandler } from "./shared";

export interface ABTestProps {
  children: React.ReactNode;
  testRef: React.RefObject<any>;
  name: string;
}

interface IState {
  component: React.ReactNode;
  loading: boolean;
  error: boolean;
  variant: string;
  show: boolean;
}

interface ContainerProps {
  children: React.ReactNode;
  emitter: () => {};
}

const Container = React.forwardRef(
  (props: ContainerProps, ref: React.Ref<any>) => {
    React.useImperativeHandle(ref, () => ({ emitter: props.emitter }));

    return <Fragment>{props.children}</Fragment>;
  }
);

export const ABTest = ({ children, name, testRef }: ABTestProps) => {
  const context = useUpstampsContext();
  const [state, setState] = useState<IState>({
    component: [],
    loading: true,
    error: false,
    variant: "A",
    show: false
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

  const onEmitter = async () => {
    try {
      return await emitterHandler(state.variant, name, url);
    } catch (e) {
      return e;
    }
  };

  if (!state.loading && !state.show) return null;

  return (
    <Container ref={testRef} emitter={onEmitter}>
      {state.component}
    </Container>
  );
};

const Variant = ({
  children,
  name
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return React.cloneElement(
    <Fragment />,
    { name },
    <Fragment>{children}</Fragment>
  );
};

Variant.displayName = "ABTest.Variant";

ABTest.Variant = Variant;
