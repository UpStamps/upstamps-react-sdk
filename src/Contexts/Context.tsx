import React, { createContext, useEffect, useReducer, useMemo } from "react";
//Constants
import { apiUrl } from "../Utils/constants";
//Utils
import localForage from "localforage";

export interface UpStampsConfigParams {
  clientId: string;
  envKey: string;
  projectKey: string;
  endpoint?: string;
}

export interface UpStampsState {
  loading: boolean;
  error: boolean;
  flags: Array<string>;
  remotes: Array<{ name: string; data: {} }>;
  params: UpStampsConfigParams;
}

export interface UpStampsContextState {
  state: UpStampsState;
}

export interface UpStampsProviderProps extends UpStampsConfigParams {
  children: React.ReactNode;
}

export type ReducerSetFlags = {
  type: "set-flags";
  payload: {
    flags: Array<string>;
    loading: boolean;
  };
};

export type ReducerSetFlagsError = {
  type: "set-flags-error";
  payload: {
    error: boolean;
    loading: boolean;
  };
};

export type ReducerSetRemotes = {
  type: "set-remotes";
  payload: {
    remotes: Array<{
      name: string;
      data: {};
    }>;
    loading: boolean;
  };
};

export type ReducerSetRemotesError = {
  type: "set-remotes-error";
  payload: {
    error: boolean;
    loading: boolean;
  };
};

export type ReducerActions =
  | ReducerSetFlags
  | ReducerSetFlagsError
  | ReducerSetRemotes
  | ReducerSetRemotesError;

export const UpStampsContext = createContext<UpStampsContextState>(
  {} as UpStampsContextState
);

let reducer = (state: UpStampsState, action: ReducerActions) => {
  switch (action.type) {
    case "set-flags":
      return { ...state, ...action.payload };
    case "set-flags-error":
      return { ...state, ...action.payload };
    case "set-remotes":
      return { ...state, ...action.payload };
    case "set-remotes-error":
      return { ...state, ...action.payload };

    default:
      throw new Error(`Unhandled action type`);
  }
};

export const UpStampsProvider: React.FC<UpStampsProviderProps> = ({
  children,
  clientId,
  envKey,
  projectKey,
  endpoint = apiUrl
}) => {
  const params = {
    clientId,
    envKey,
    projectKey,
    endpoint
  };

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: false,
    flags: [],
    remotes: [],
    params
  });

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  //Get All Flags on Init
  useEffect(() => {
    let ignore = false;
    //Get All the Flags
    const onFetchFlags = async () => {
      try {
        //If the flags are collected, do not fetch again
        if (state.flags.length > 0) return;

        //Service Url
        const url = `${endpoint}/${clientId}/${projectKey}/${envKey}/flags`;

        //Response with the all the flags
        const response = await fetch(url);
        const { flags } = await response.json();

        //Filters flags a creates a simple array
        const data = flags.map((item: { name: string }) => item.name);

        //Updates the state with the flags
        if (!ignore) {
          dispatch({
            type: "set-flags",
            payload: {
              flags: data,
              loading: false
            }
          });
          //Update or save on localStorage
          await localForage.setItem("flags", data);
        }
      } catch (e) {
        dispatch({
          type: "set-flags-error",
          payload: { loading: false, error: true }
        });
      }
    };
    //Get All the Remote Flags
    const onFetchRemotes = async () => {
      try {
        //If the Remotes Flags are collected, do not fetch again
        if (state.remotes.length > 0) return;

        //Service Url
        const url = `${endpoint}/${clientId}/${projectKey}/${envKey}/remotes`;

        //Response with the all the remotes flags
        const response = await fetch(url);
        const { remotes } = await response.json();

        //Updates the state with the remotes flags
        if (!ignore) {
          dispatch({
            type: "set-remotes",
            payload: { remotes, loading: false }
          });
          //Update or save on localStorage
          await localForage.setItem("remotes", remotes);
        }
      } catch (e) {
        dispatch({
          type: "set-remotes-error",
          payload: { loading: false, error: true }
        });
      }
    };
    onFetchFlags();
    onFetchRemotes();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <UpStampsContext.Provider value={value}>
      {children}
    </UpStampsContext.Provider>
  );
};
