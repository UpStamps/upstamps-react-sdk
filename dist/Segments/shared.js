import { __awaiter, __generator } from "tslib";
//Utils
import { queryBuilder } from "../Utils/functions";
export var handleFetch = function (url, name, params) { return __awaiter(void 0, void 0, void 0, function () {
    var query, response, segment, show, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                query = queryBuilder({
                    name: name,
                    country: params.country,
                    client: params.client,
                    clientType: params.clientType,
                });
                return [4 /*yield*/, fetch(url + "?" + query, {
                        method: "GET",
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                segment = (_a.sent()).segment;
                show = segment.length > 0;
                return [2 /*return*/, {
                        segment: segment,
                        show: show,
                        loading: false,
                    }];
            case 3:
                e_1 = _a.sent();
                throw e_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
