import { useState, useEffect } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { handleFetch } from "./shared";
import localForage from "localforage";
import isEqual from "lodash.isequal";

interface IState {
  loading: boolean;
  error: boolean;
  show: boolean;
}

interface Params {
  country?: string;
  client?: string;
  clientType?: string;
}

interface IStorageData extends IState {
  params: Params;
}

export const useSegment = (
  name: string,
  params: { country?: string; client?: string; clientType?: string },
  localStorage: boolean = false
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
        const storageData = (await localForage.getItem(name)) as IStorageData;
        //Checks the current data on local storage
        if (localStorage && storageData !== null) {
          console.log("useSegment local");
          setState((prevState: IState) => {
            return {
              ...prevState,
              show: isEqual(params, storageData.params),
              loading: false
            };
          });
        } else {
          const { show, loading } = await handleFetch(url, name, params);
          console.log("useSegment remote");
          setState((prevState: IState) => {
            return {
              ...prevState,
              show,
              loading
            };
          });

          //Updates local storage with the new data
          await localForage.setItem(name, {
            show,
            loading,
            params
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

  return {
    show: state.show,
    error: state.error,
    loading: state.loading
  } as const;
};
