import { __assign, __awaiter, __generator } from "tslib";
import { useState, useEffect } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { handleFetch } from "./shared";
export var useSegment = function (name, params) {
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
    return {
        show: state.show,
        error: state.error,
        loading: state.loading,
    };
};
