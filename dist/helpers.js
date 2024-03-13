"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUrl(url, context, queryParams) {
    if (!url && (!context || !context.url)) {
        throw new Error("URL must be provided in useQuery or context.url must be set when Wrapping around QueryContext");
    }
    var $URL = url || context.url;
    var queryString = "";
    if (queryParams) {
        var params = new URLSearchParams(queryParams).toString();
        queryString = "?".concat(params);
    }
    return "".concat($URL).concat(queryString);
}
exports.default = getUrl;
