import React, { createContext, useEffect, useReducer, useMemo } from "react";
//Constants
import { apiUrl } from "../Utils/constants";
//Contexts
import useUpstampsContext from "../Contexts/useUpstampsContext";

export interface ScopesConfigParams {
  name?: string | null;
  email: string;
}

export interface ScopesState {
  loading: boolean;
  error: boolean;
  params: ScopesConfigParams;
}

export interface ScopesContextState {
  state: ScopesState;
}

export interface ScopesProviderProps extends ScopesConfigParams {
  children: React.ReactNode;
}

export type ReducerSetScope = {
  type: "set-scope";
  payload: {
    success: boolean;
    loading: boolean;
  };
};

export type ReducerSetScopeError = {
  type: "set-scope-error";
  payload: {
    error: boolean;
    loading: boolean;
  };
};

export type ReducerScopeActions = ReducerSetScope | ReducerSetScopeError;

export const ScopesContext = createContext<ScopesContextState>(
  {} as ScopesContextState
);

let reducer = (state: ScopesState, action: ReducerScopeActions) => {
  switch (action.type) {
    case "set-scope":
      return { ...state, ...action.payload };
    case "set-scope-error":
      return { ...state, ...action.payload };

    default:
      throw new Error(`Unhandled action type`);
  }
};

export const ScopesProvider: React.FC<ScopesProviderProps> = ({
  children,
  name,
  email
}) => {
  const context = useUpstampsContext();

  const params = {
    name,
    email
  };

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: false,
    params
  });

  const { clientId, projectKey } = context.state.params;

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    let ignore = false;
    const onSetScope = async () => {
      try {
        //Service Url
        const url = `${apiUrl}/${clientId}/${projectKey}/scopes/add`;

        const post_body = {
          name,
          email
        };

        await fetch(url, {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body: JSON.stringify(post_body)
        });

        window.localStorage.setItem("upstamps_scope_email", email);

        if (!ignore) {
          dispatch({
            type: "set-scope",
            payload: { success: true, loading: false }
          });
        }
      } catch (e) {
        dispatch({
          type: "set-scope-error",
          payload: { loading: false, error: true }
        });
      }
    };

    //Get the email from localStorage
    const storageEmail = window.localStorage.getItem("upstamps_scope_email");

    //Only set a scope if the email is null or different
    if (storageEmail !== email) {
      onSetScope();
    }
    return () => {
      ignore = true;
    };
  }, [email]);

  return (
    <ScopesContext.Provider value={value}>{children}</ScopesContext.Provider>
  );
};
