import { useMemo } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
export var useFlag = function (name) {
    var state = useUpstampsContext().state;
    var flags = useMemo(function () { return state.flags; }, [state.flags]);
    return {
        show: flags.indexOf(name) !== -1,
    };
};
