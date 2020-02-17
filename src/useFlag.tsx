import { useContext, useMemo } from "react";
import { UpStampsContext } from "./Context";

export const useFlag = (name: string) => {
  const { state } = useContext(UpStampsContext);
  const flags = useMemo(() => state.flags, [state.flags]);

  return {
    show: flags.indexOf(name) !== -1,
  } as const;
};
