import { __assign, __awaiter, __generator } from "tslib";
import React, { Fragment, useEffect, useState } from "react";
import useUpstampsContext from "../Contexts/useUpstampsContext";
//Utils
import { apiUrl } from "../Utils/constants";
import { fetchHandler, emitterHandler } from "./shared";
var Container = React.forwardRef(function (props, ref) {
    React.useImperativeHandle(ref, function () { return ({ emitter: props.emitter }); });
    return React.createElement(Fragment, null, props.children);
});
export var ABTest = function (_a) {
    var children = _a.children, name = _a.name, testRef = _a.testRef;
    var context = useUpstampsContext();
    var _b = useState({
        component: [],
        loading: true,
        error: false,
        variant: "A",
        show: false,
    }), state = _b[0], setState = _b[1];
    var _c = context.state.params, clientId = _c.clientId, projectKey = _c.projectKey, envKey = _c.envKey;
    var url = apiUrl + "/" + clientId + "/" + projectKey + "/" + envKey + "/testing";
    var onRenderChildren = function (variant) {
        var component = React.Children.map(children, function (child) {
            if (child.props.name === variant) {
                return child;
            }
        });
        setState(function (prevState) {
            return __assign(__assign({}, prevState), { component: component });
        });
    };
    useEffect(function () {
        var onFetch = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, show_1, loading_1, variant_1, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetchHandler(url, name)];
                    case 1:
                        _a = _b.sent(), show_1 = _a.show, loading_1 = _a.loading, variant_1 = _a.variant;
                        onRenderChildren(variant_1);
                        setState(function (prevState) {
                            return __assign(__assign({}, prevState), { show: show_1,
                                variant: variant_1,
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
    if (!state.loading && !state.show)
        return null;
    return (React.createElement(Container, { ref: testRef, emitter: onEmitter }, state.component));
};
var Variant = function (_a) {
    var children = _a.children, name = _a.name;
    return React.cloneElement(React.createElement(Fragment, null), { name: name }, React.createElement(Fragment, null, children));
};
Variant.displayName = "ABTest.Variant";
ABTest.Variant = Variant;
