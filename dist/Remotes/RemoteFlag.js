import React, { Fragment, useMemo } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
export var RemoteFlag = function (_a) {
    var children = _a.children, name = _a.name;
    var state = useUpstampsContext().state;
    var remote = useMemo(function () { return state.remotes.filter(function (item) { return item.name === name; }); }, [state.remotes, name]);
    var verifyRemote = useMemo(function () { return remote.length > 0; }, [remote]);
    var data = verifyRemote ? remote[0].data : {};
    //Hide the feature
    if (!verifyRemote)
        return null;
    return React.createElement(Fragment, null, children(data));
};
