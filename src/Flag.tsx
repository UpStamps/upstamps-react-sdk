import React, { Fragment, useContext } from "react";
import { UpStampsContext } from "./Context";

export interface FlagProps {
  children: React.ReactNode;
  name: string;
}

export const Flag: React.FC<FlagProps> = ({ children, name }) => {
  const { state } = useContext(UpStampsContext);
  const show = state.flags.indexOf(name) !== -1;

  //Hide the feature
  if (!show) return null;

  return <Fragment>{children}</Fragment>;
};
