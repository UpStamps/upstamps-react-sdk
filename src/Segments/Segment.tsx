import React, { Fragment, useEffect, useState } from "react";
//Utils
import { apiUrl } from "../Utils/constants";
import { handleFetch } from "./shared";
//Context
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Types
import { IState, SegmentProps } from "./types";

export const Segment: React.FC<SegmentProps> = ({ children, name, params }) => {
  const context = useUpstampsContext();
  const [state, setState] = useState<IState>({
    loading: true,
    error: false,
    show: false,
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

  //Hide the feature
  if (!state.show) return null;

  return <Fragment>{children}</Fragment>;
};
