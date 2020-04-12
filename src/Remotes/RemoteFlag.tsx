import React, { Fragment, useMemo } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";

export interface RemoteFlagProps {
  children: any;
  name: string;
}

export const RemoteFlag: React.FC<RemoteFlagProps> = ({ children, name }) => {
  const { state } = useUpstampsContext();

  const remote = useMemo(
    () => state.remotes.filter((item: any) => item.name === name),
    [state.remotes, name]
  );
  const verifyRemote = useMemo(() => remote.length > 0, [remote]);
  const data = verifyRemote ? remote[0].data : {};

  //Hide the feature
  if (!verifyRemote) return null;

  return <Fragment>{children(data)}</Fragment>;
};
