import { __assign, __awaiter, __generator } from "tslib";
import { useEffect, useState } from "react";
//Context
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { fetchHandler, emitterHandler } from "./shared";
import localForage from "localforage";
export var useABTestLocal = function (name, localStorage) {
    if (localStorage === void 0) { localStorage = false; }
    var context = useUpstampsContext();
    var _a = useState({
        loading: true,
        error: false,
        show: false,
        variant: "A",
    }), state = _a[0], setState = _a[1];
    var _b = context.state.params, clientId = _b.clientId, projectKey = _b.projectKey, envKey = _b.envKey;
    var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/testing";
    useEffect(function () {
        var onFetch = function () { return __awaiter(void 0, void 0, void 0, function () {
            var storageData_1, _a, show_1, loading_1, variant_1, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, localForage.getItem(name)];
                    case 1:
                        storageData_1 = (_b.sent());
                        if (!(localStorage && storageData_1 !== null)) return [3 /*break*/, 2];
                        console.log("useABTest local");
                        setState(function (prevState) {
                            return __assign(__assign({}, prevState), storageData_1);
                        });
                        return [3 /*break*/, 5];
                    case 2:
                        console.log("useABTest remote");
                        return [4 /*yield*/, fetchHandler(url, name)];
                    case 3:
                        _a = _b.sent(), show_1 = _a.show, loading_1 = _a.loading, variant_1 = _a.variant;
                        setState(function (prevState) {
                            return __assign(__assign({}, prevState), { show: show_1,
                                variant: variant_1,
                                loading: loading_1 });
                        });
                        //Updates local storage with the new data
                        return [4 /*yield*/, localForage.setItem(name, {
                                show: show_1,
                                variant: variant_1,
                                loading: loading_1,
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
    var onEmitter = function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, emitterHandler(state.variant, name, url)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_2 = _a.sent();
                    return [2 /*return*/, e_2];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return {
        show: state.show,
        error: state.error,
        loading: state.loading,
        variant: state.variant,
        emitter: onEmitter,
    };
};
