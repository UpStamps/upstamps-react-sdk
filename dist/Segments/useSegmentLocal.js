import { __assign, __awaiter, __generator } from "tslib";
import { useState, useEffect } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { handleFetch } from "./shared";
import localForage from "localforage";
import isEqual from "lodash.isequal";
export var useSegmentLocal = function (name, params, localStorage) {
    if (localStorage === void 0) { localStorage = false; }
    var context = useUpstampsContext();
    var _a = useState({
        loading: true,
        error: false,
        show: false,
    }), state = _a[0], setState = _a[1];
    var _b = context.state.params, clientId = _b.clientId, projectKey = _b.projectKey, envKey = _b.envKey;
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
                        console.log("useSegment local");
                        setState(function (prevState) {
                            return __assign(__assign({}, prevState), { show: isEqual(params, storageData_1.params), loading: false });
                        });
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, handleFetch(url, name, params)];
                    case 3:
                        _a = _b.sent(), show_1 = _a.show, loading_1 = _a.loading;
                        console.log("useSegment remote");
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
    return {
        show: state.show,
        error: state.error,
        loading: state.loading,
    };
};
