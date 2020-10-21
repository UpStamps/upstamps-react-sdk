import React, { Fragment, useEffect, useState } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { fetchHandler, emitterHandler } from "./shared";
import localForage from "localforage";
//Types
import {ABTestLocalProps, IState, ContainerProps} from "./types"


const Container = React.forwardRef(
  (props: ContainerProps, ref: React.Ref<any>) => {
    React.useImperativeHandle(ref, () => ({ emitter: props.emitter }));

    return <Fragment>{props.children}</Fragment>;
  }
);

export const ABTestLocal = ({
  children,
  name,
  testRef,
  localStorage = false
}: ABTestLocalProps) => {
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
        const storageData = (await localForage.getItem(name)) as IState;

        //Checks the current data on local storage
        if (localStorage && storageData !== null) {
          console.log("ABTest local");
          onRenderChildren(storageData.variant);

          setState((prevState: IState) => {
            return {
              ...prevState,
              ...storageData
            };
          });
        } else {
          console.log("ABTest remote");
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

          //Updates local storage with the new data
          await localForage.setItem(name, {
            show,
            variant,
            loading
          });
        }
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

ABTestLocal.Variant = Variant;
