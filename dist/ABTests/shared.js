import { __awaiter, __generator } from "tslib";
export var variantTypes = ["A", "B"];
export var fetchHandler = function (url, name) { return __awaiter(void 0, void 0, void 0, function () {
    var response, ABTesting, result, show, randomVariant, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                ABTesting = (_a.sent()).ABTesting;
                result = ABTesting.filter(function (item) { return item.name === name; });
                show = result.length > 0;
                randomVariant = Math.floor(Math.random() * variantTypes.length);
                return [2 /*return*/, {
                        show: show,
                        variant: variantTypes[randomVariant],
                        loading: false,
                    }];
            case 3:
                e_1 = _a.sent();
                throw e_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
export var emitterHandler = function (variant, name, url) { return __awaiter(void 0, void 0, void 0, function () {
    var post_body, response, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                post_body = {
                    name: name,
                    varA: variant === "A" ? 1 : 0,
                    varB: variant === "B" ? 1 : 0,
                };
                return [4 /*yield*/, fetch(url, {
                        method: "POST",
                        headers: { "content-type": "application/x-www-form-urlencoded" },
                        body: JSON.stringify(post_body),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, e_2];
            case 4: return [2 /*return*/];
        }
    });
}); };
