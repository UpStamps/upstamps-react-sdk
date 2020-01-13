import { useContext } from "react";
import { UpStampsContext } from "./Context";

export const useFlag = (name: string) => {
  const { state } = useContext(UpStampsContext);

  return {
    show: state.flags.indexOf(name) !== -1,
  } as const;
};
