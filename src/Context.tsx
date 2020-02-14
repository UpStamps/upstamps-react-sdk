import React, { useState, createContext, useEffect } from "react";

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

export const UpStampsContext = createContext<UpStampsContextState>(
  {} as UpStampsContextState
);

const apiUrl: string = "https://services.upstamps.com/api";

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

  const [state, dispatch] = useState({
    loading: true,
    error: false,
    flags: [],
    params,
  });

  const [contextValue, setContextValue] = useState({
    state,
    dispatch,
  });

  useEffect(() => {
    const onFetchFlags = async () => {
      try {
        //If the flags are collected, do not fetch again
        if (state.flags.length > 0) return;
        //Service Url
        const url = `${apiUrl}/${clientId}/${projectKey}/${envKey}`;
        //Response with the all the flags
        const response = await fetch(url);
        const { flags } = await response.json();
        //Filters flags a creates a simple array
        const data = flags.map((item: { name: string }) => item.name);
        //Updates the state with the flags
        dispatch(prevState => {
          return { ...prevState, flags: data, loading: false };
        });
      } catch (e) {
        dispatch(prevState => {
          return { ...prevState, error: true, loading: false };
        });
      }
    };
    onFetchFlags();
  }, [state.flags, clientId, envKey, projectKey]);

  // Update context value and trigger re-render
  // This patterns avoids unnecessary deep renders
  // https://reactjs.org/docs/context.html#caveats
  useEffect(() => {
    setContextValue({ ...contextValue, state });
  }, [state, contextValue]);

  return (
    <UpStampsContext.Provider value={contextValue}>
      {children}
    </UpStampsContext.Provider>
  );
};
