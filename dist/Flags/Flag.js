import React, { Fragment, useMemo } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
export var Flag = function (_a) {
    var children = _a.children, name = _a.name;
    var state = useUpstampsContext().state;
    var show = useMemo(function () { return state.flags.indexOf(name) !== -1; }, [
        state.flags,
        name,
    ]);
    //Hide the feature
    if (!show)
        return null;
    return React.createElement(Fragment, null, children);
};
