import React, { Fragment, useMemo } from "react";
import useUpstampsContext from "./useUpstampsContext";

export interface FlagProps {
  children: React.ReactNode;
  name: string;
}

export const Flag: React.FC<FlagProps> = ({ children, name }) => {
  const { state } = useUpstampsContext();
  const show = useMemo(() => state.flags.indexOf(name) !== -1, [
    state.flags,
    name,
  ]);

  //Hide the feature
  if (!show) return null;

  return <Fragment>{children}</Fragment>;
};
