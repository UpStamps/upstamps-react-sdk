import { useMemo } from "react";
import useUpstampsContext from "./useUpstampsContext";

export const useFlag = (name: string) => {
  const { state } = useUpstampsContext();
  const flags = useMemo(() => state.flags, [state.flags]);
  console.log("Render");

  return {
    show: flags.indexOf(name) !== -1,
  } as const;
};
