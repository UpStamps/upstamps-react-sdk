import { __assign, __awaiter, __generator } from "tslib";
import React, { Fragment, useEffect, useState } from "react";
//Utils
import { apiUrl } from "../Utils/constants";
import { handleFetch } from "./shared";
import isEqual from "lodash.isequal";
//Context
import useUpstampsContext from "../Contexts/useUpstampsContext";
//LocalStorage
import localForage from "localforage";
export var SegmentLocal = function (_a) {
    var children = _a.children, name = _a.name, params = _a.params, _b = _a.localStorage, localStorage = _b === void 0 ? false : _b;
    var context = useUpstampsContext();
    var _c = useState({
        loading: true,
        error: false,
        show: false,
    }), state = _c[0], setState = _c[1];
    var _d = context.state.params, clientId = _d.clientId, projectKey = _d.projectKey, envKey = _d.envKey;
    var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/segment";
    useEffect(function () {
        var onFetch = function () { return __awaiter(void 0, void 0, void 0, function () {
            var storageData_1, _a, show_1, loading_1, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, localForage.getItem(name)];
                    case 1:
                        storageData_1 = (_b.sent());
                        if (!(localStorage && storageData_1 !== null)) return [3 /*break*/, 2];
                        console.log("Segment local = ");
                        setState(function (prevState) {
                            return __assign(__assign({}, prevState), { show: isEqual(params, storageData_1.params), loading: false });
                        });
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, handleFetch(url, name, params)];
                    case 3:
                        _a = _b.sent(), show_1 = _a.show, loading_1 = _a.loading;
                        console.log("Segment remote");
                        setState(function (prevState) {
                            return __assign(__assign({}, prevState), { show: show_1,
                                loading: loading_1 });
                        });
                        //Updates local storage with the new data
                        return [4 /*yield*/, localForage.setItem(name, {
                                show: show_1,
                                loading: loading_1,
                                params: params,
                            })];
                    case 4:
                        //Updates local storage with the new data
                        _b.sent();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        setState(function (prevState) {
                            return __assign(__assign({}, prevState), { error: true, loading: false });
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
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
