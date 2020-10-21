import { useState, useEffect } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { handleFetch } from "./shared";
//Types 
import {IState} from "./types"



export const useSegment = (
  name: string,
  params: { country?: string; client?: string; clientType?: string }
) => {
  const context = useUpstampsContext();
  const [state, setState] = useState<IState>({
    loading: true,
    error: false,
    show: false
  });
  const { clientId, projectKey, envKey } = context.state.params;
  const url = `${apiUrl}/${clientId}/${projectKey}/${envKey}/segment`;

  useEffect(() => {
    const onFetch = async () => {
      try {
        const { show, loading } = await handleFetch(url, name, params);

        setState((prevState: IState) => {
          return {
            ...prevState,
            show,
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

  return {
    show: state.show,
    error: state.error,
    loading: state.loading
  } as IState | { emitter: () => {} };
};
