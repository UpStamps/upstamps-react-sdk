import React, { Fragment, useEffect, useState } from "react";
//Utils
import { apiUrl } from "../Utils/constants";
import { handleFetch } from "./shared";
import isEqual from "lodash.isequal";
//Context
import useUpstampsContext from "../Contexts/useUpstampsContext";
//LocalStorage
import localForage from "localforage";
//Types 
import {IState, SegmentLocalProps, IStorageData} from "./types"


export const SegmentLocal: React.FC<SegmentLocalProps> = ({
  children,
  name,
  params,
  localStorage = false
}) => {
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
          console.log("Segment local = ");
          setState((prevState: IState) => {
            return {
              ...prevState,
              show: isEqual(params, storageData.params),
              loading: false
            };
          });
        } else {
          const { show, loading } = await handleFetch(url, name, params);
          console.log("Segment remote");
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

  //Hide the feature
  if (!state.show) return null;

  return <Fragment>{children}</Fragment>;
};
