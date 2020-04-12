import { useMemo } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";

export const useFlag = (name: string) => {
  const { state } = useUpstampsContext();
  const flags = useMemo(() => state.flags, [state.flags]);

  return {
    show: flags.indexOf(name) !== -1,
  } as const;
};
