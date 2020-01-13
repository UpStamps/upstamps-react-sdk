import React, { useState, createContext, useEffect } from "react";

export interface UpStampsConfigParams {
  clientId: string;
  stage: string;
  projectId: string;
}

export interface UpStampsState {
  name: string;
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

export const UpStampsProvider: React.FC<UpStampsProviderProps> = ({
  children,
  clientId,
  stage,
  projectId,
}) => {
  const params = {
    clientId,
    stage,
    projectId,
  };

  const [state, dispatch] = useState({
    name: "Johhn",
    flags: ["car", "chat", "profile", "drawer"],
    params,
  });

  const [contextValue, setContextValue] = useState({
    state,
    dispatch,
  });

  // Update context value and trigger re-render
  // This patterns avoids unnecessary deep renders
  // https://reactjs.org/docs/context.html#caveats
  useEffect(() => {
    setContextValue({ ...contextValue, state });
  }, [state]);

  return (
    <UpStampsContext.Provider value={contextValue}>
      {children}
    </UpStampsContext.Provider>
  );
};
