/* eslint-disable */
export var queryBuilder = function (params) {
    var esc = encodeURIComponent;
    return Object.keys(params)
        .filter(function (key) { return params[key] !== undefined && params[key] && params[key] !== null; })
        .map(function (key) { return esc(key) + "=" + esc(params[key]); })
        .join("&");
};
