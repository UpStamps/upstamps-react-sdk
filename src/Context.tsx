import React, { createContext, useEffect, useReducer, useMemo } from "react";
//Constants
import { apiUrl } from "./constants";

export interface UpStampsConfigParams {
  clientId: string;
  envKey: string;
  projectKey: string;
}

export interface UpStampsState {
  loading: boolean;
  error: boolean;
  flags: Array<string>;
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
    error?: boolean;
    loading: boolean;
  };
};

export type ReducerActions = ReducerSetFlags;

export const UpStampsContext = createContext<UpStampsContextState>(
  {} as UpStampsContextState
);

let reducer = (state: UpStampsState, action: ReducerActions) => {
  switch (action.type) {
    case "set-flags":
      return { ...state, ...action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const UpStampsProvider: React.FC<UpStampsProviderProps> = ({
  children,
  clientId,
  envKey,
  projectKey,
}) => {
  const params = {
    clientId,
    envKey,
    projectKey,
  };

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: false,
    flags: [],
    params,
  });

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    let ignore = false;
    const onFetchFlags = async () => {
      try {
        //If the flags are collected, do not fetch again
        if (state.flags.length > 0) return;
        //Service Url
        const url = `${apiUrl}/flags/${clientId}/${projectKey}/${envKey}`;

        //Response with the all the flags
        const response = await fetch(url);
        const { flags } = await response.json();

        //Filters flags a creates a simple array
        const data = flags.map((item: { name: string }) => item.name);

        //Updates the state with the flags
        if (!ignore) {
          dispatch({
            type: "set-flags",
            payload: { flags: data, loading: false },
          });
        }
      } catch (e) {
        dispatch({
          type: "set-flags",
          payload: { flags: [], loading: false, error: true },
        });
      }
    };
    onFetchFlags();
    return () => {
      ignore = true;
    };
  }, [state.flags, clientId, envKey, projectKey]);

  return (
    <UpStampsContext.Provider value={value}>
      {children}
    </UpStampsContext.Provider>
  );
};
