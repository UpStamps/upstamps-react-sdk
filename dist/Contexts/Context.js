import { __assign, __awaiter, __generator } from "tslib";
import React, { createContext, useEffect, useReducer, useMemo } from "react";
//Constants
import { apiUrl } from "../Utils/constants";
//Utils
import localForage from "localforage";
export var UpStampsContext = createContext({});
var reducer = function (state, action) {
    switch (action.type) {
        case "set-flags":
            return __assign(__assign({}, state), action.payload);
        case "set-flags-error":
            return __assign(__assign({}, state), action.payload);
        case "set-remotes":
            return __assign(__assign({}, state), action.payload);
        case "set-remotes-error":
            return __assign(__assign({}, state), action.payload);
        default:
            throw new Error("Unhandled action type");
    }
};
export var UpStampsProvider = function (_a) {
    var children = _a.children, clientId = _a.clientId, envKey = _a.envKey, projectKey = _a.projectKey, _b = _a.endpoint, endpoint = _b === void 0 ? apiUrl : _b;
    var params = {
        clientId: clientId,
        envKey: envKey,
        projectKey: projectKey,
        endpoint: endpoint,
    };
    var _c = useReducer(reducer, {
        loading: true,
        error: false,
        flags: [],
        remotes: [],
        params: params,
    }), state = _c[0], dispatch = _c[1];
    var value = useMemo(function () { return ({ state: state, dispatch: dispatch }); }, [state, dispatch]);
    //Get All Flags on Init
    useEffect(function () {
        var ignore = false;
        //Get All the Flags
        var onFetchFlags = function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, response, flags, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        //If the flags are collected, do not fetch again
                        if (state.flags.length > 0)
                            return [2 /*return*/];
                        url = endpoint + "/" + clientId + "/" + projectKey + "/" + envKey + "/flags";
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        flags = (_a.sent()).flags;
                        data = flags.map(function (item) { return item.name; });
                        if (!!ignore) return [3 /*break*/, 4];
                        dispatch({
                            type: "set-flags",
                            payload: {
                                flags: data,
                                loading: false,
                            },
                        });
                        //Update or save on localStorage
                        return [4 /*yield*/, localForage.setItem("flags", data)];
                    case 3:
                        //Update or save on localStorage
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        dispatch({
                            type: "set-flags-error",
                            payload: { loading: false, error: true },
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        //Get All the Remote Flags
        var onFetchRemotes = function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, response, remotes, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        //If the Remotes Flags are collected, do not fetch again
                        if (state.remotes.length > 0)
                            return [2 /*return*/];
                        url = endpoint + "/" + clientId + "/" + projectKey + "/" + envKey + "/remotes";
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        remotes = (_a.sent()).remotes;
                        if (!!ignore) return [3 /*break*/, 4];
                        dispatch({
                            type: "set-remotes",
                            payload: { remotes: remotes, loading: false },
                        });
                        //Update or save on localStorage
                        return [4 /*yield*/, localForage.setItem("remotes", remotes)];
                    case 3:
                        //Update or save on localStorage
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        dispatch({
                            type: "set-remotes-error",
                            payload: { loading: false, error: true },
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        onFetchFlags();
        onFetchRemotes();
        return function () {
            ignore = true;
        };
    }, []);
    return (React.createElement(UpStampsContext.Provider, { value: value }, children));
};
