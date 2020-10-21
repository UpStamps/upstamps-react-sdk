import { __assign, __awaiter, __generator } from "tslib";
import React, { Fragment, useEffect, useState } from "react";
//Utils
import { apiUrl } from "../Utils/constants";
import { handleFetch } from "./shared";
//Context
import useUpstampsContext from "../Contexts/useUpstampsContext";
export var Segment = function (_a) {
    var children = _a.children, name = _a.name, params = _a.params;
    var context = useUpstampsContext();
    var _b = useState({
        loading: true,
        error: false,
        show: false,
    }), state = _b[0], setState = _b[1];
    var _c = context.state.params, clientId = _c.clientId, projectKey = _c.projectKey, envKey = _c.envKey;
    var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/segment";
    useEffect(function () {
        var onFetch = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, show_1, loading_1, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, handleFetch(url, name, params)];
                    case 1:
                        _a = _b.sent(), show_1 = _a.show, loading_1 = _a.loading;
                        setState(function (prevState) {
                            return __assign(__assign({}, prevState), { show: show_1,
                                loading: loading_1 });
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        setState(function (prevState) {
                            return __assign(__assign({}, prevState), { error: true, loading: false });
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        onFetch();
    }, [name, context.state.params]);
    //Hide the feature
    if (!state.show)
        return null;
    return React.createElement(Fragment, null, children);
};
