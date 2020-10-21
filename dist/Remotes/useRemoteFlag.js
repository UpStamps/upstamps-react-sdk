import { useMemo } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
export var useRemoteFlag = function (name) {
    var state = useUpstampsContext().state;
    var remote = useMemo(function () { return state.remotes.filter(function (item) { return item.name === name; }); }, [state.remotes, name]);
    var verifyRemote = useMemo(function () { return remote.length > 0; }, [remote]);
    return {
        show: verifyRemote,
        data: verifyRemote ? remote[0].data : {},
    };
};
