import { useEffect, useState } from "react";
//Context
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { fetchHandler, emitterHandler } from "./shared";
import localForage from "localforage";
//Types
import { IState } from "./types";

export const useABTestLocal = (name: string, localStorage = false) => {
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
        const storageData = (await localForage.getItem(name)) as IState;

        //Checks the current data on local storage
        if (localStorage && storageData !== null) {
          console.log("useABTest local");
          setState((prevState: IState) => {
            return {
              ...prevState,
              ...storageData,
            };
          });
        } else {
          console.log("useABTest remote");
          const { show, loading, variant } = await fetchHandler(url, name);
          setState((prevState: IState) => {
            return {
              ...prevState,
              show,
              variant,
              loading,
            };
          });
          //Updates local storage with the new data
          await localForage.setItem(name, {
            show,
            variant,
            loading,
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

  return {
    show: state.show,
    error: state.error,
    loading: state.loading,
    variant: state.variant,
    emitter: onEmitter,
  } as const;
};
