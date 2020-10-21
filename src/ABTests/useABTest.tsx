import { useEffect, useState } from "react";
//Context
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { fetchHandler, emitterHandler } from "./shared";
//Types
import { IState } from "./types";

export const useABTest = (name: string) => {
  const context = useUpstampsContext();
  const [state, setState] = useState<IState>({
    loading: true,
    error: false,
    show: false,
    variant: "A",
  });
  const { clientId, projectKey, envKey } = context.state.params;
  const url = `${apiUrl}/${clientId}/${projectKey}/${envKey}/testing`;

  useEffect(() => {
    const onFetch = async () => {
      try {
        const { show, loading, variant } = await fetchHandler(url, name);

        setState((prevState: IState) => {
          return {
            ...prevState,
            show,
            variant,
            loading,
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

  return {
    show: state.show,
    error: state.error,
    loading: state.loading,
    variant: state.variant,
    emitter: onEmitter,
  } as IState | { emitter: () => unknown };
};
