"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientProviderConfig = /** @class */ (function () {
    function ClientProviderConfig(_a) {
        var url = _a.url, authToken = _a.authToken, defaultHeaders = _a.defaultHeaders;
        this.url = url;
        this.authToken = authToken;
        this.defaultHeaders = defaultHeaders;
    }
    return ClientProviderConfig;
}());
exports.default = ClientProviderConfig;
