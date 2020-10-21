import { __assign, __awaiter, __generator } from "tslib";
import React, { createContext, useEffect, useReducer, useMemo } from "react";
//Constants
import { apiUrl } from "../Utils/constants";
//Contexts
import useUpstampsContext from "../Contexts/useUpstampsContext";
export var ScopesContext = createContext({});
var reducer = function (state, action) {
    switch (action.type) {
        case "set-scope":
            return __assign(__assign({}, state), action.payload);
        case "set-scope-error":
            return __assign(__assign({}, state), action.payload);
        default:
            throw new Error("Unhandled action type");
    }
};
export var ScopesProvider = function (_a) {
    var children = _a.children, name = _a.name, email = _a.email;
    var context = useUpstampsContext();
    var params = {
        name: name,
        email: email,
    };
    var _b = useReducer(reducer, {
        loading: true,
        error: false,
        params: params,
    }), state = _b[0], dispatch = _b[1];
    var _c = context.state.params, clientId = _c.clientId, projectKey = _c.projectKey;
    var value = useMemo(function () { return ({ state: state, dispatch: dispatch }); }, [state, dispatch]);
    useEffect(function () {
        var ignore = false;
        var onSetScope = function () { return __awaiter(void 0, void 0, void 0, function () {
            var url, post_body, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = apiUrl + "/" + clientId + "/" + projectKey + "/scopes/add";
                        post_body = {
                            name: name,
                            email: email,
                        };
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                headers: { "content-type": "application/x-www-form-urlencoded" },
                                body: JSON.stringify(post_body),
                            })];
                    case 1:
                        _a.sent();
                        window.localStorage.setItem("upstamps_scope_email", email);
                        if (!ignore) {
                            dispatch({
                                type: "set-scope",
                                payload: { success: true, loading: false },
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        dispatch({
                            type: "set-scope-error",
                            payload: { loading: false, error: true },
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //Get the email from localStorage
        var storageEmail = window.localStorage.getItem("upstamps_scope_email");
        //Only set a scope if the email is null or different
        if (storageEmail !== email) {
            onSetScope();
        }
        return function () {
            ignore = true;
        };
    }, [email]);
    return (React.createElement(ScopesContext.Provider, { value: value }, children));
};
