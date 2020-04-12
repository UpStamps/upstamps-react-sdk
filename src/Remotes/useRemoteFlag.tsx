import { useMemo } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";

export const useRemoteFlag = (name: string) => {
  const { state } = useUpstampsContext();

  const remote = useMemo(
    () => state.remotes.filter((item: any) => item.name === name),
    [state.remotes, name]
  );
  const verifyRemote = useMemo(() => remote.length > 0, [remote]);

  return {
    show: verifyRemote,
    data: verifyRemote ? remote[0].data : {},
  } as { show: boolean; data: {} };
};
