"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
var react_1 = require("react");
var react_2 = require("react");
var provider_1 = require("./provider");
function useQuery(url, options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var _a = (0, react_1.useState)(null), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var context = (0, react_2.useContext)(provider_1.QueryContext);
    (0, react_1.useEffect)(function () {
        var controller;
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var apiUrl, _a, method, _b, headers, body, queryParams, timeout, signal, fetchOptions, fetchPromise_1, response, responseData, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        setIsLoading(true);
                        setError(null);
                        apiUrl = getUrl(url, context);
                        _a = options.method, method = _a === void 0 ? "GET" : _a, _b = options.headers, headers = _b === void 0 ? {} : _b, body = options.body, queryParams = options.queryParams, timeout = options.timeout;
                        controller = new AbortController();
                        signal = controller.signal;
                        fetchOptions = {
                            method: method,
                            headers: __assign({ "Content-Type": "application/json" }, headers),
                            signal: signal,
                        };
                        if (method !== "GET") {
                            fetchOptions.body = JSON.stringify(body);
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, 5, 6]);
                        if (timeout && method !== "GET") {
                            fetchPromise_1 = Promise.race([
                                fetch(apiUrl, fetchOptions),
                                new Promise(function (_, reject) {
                                    var timeoutId = setTimeout(function () {
                                        controller.abort();
                                        reject(new Error("Request timed out"));
                                    }, timeout);
                                    // Clear the timeout when the fetch completes
                                    fetchPromise_1.then(function () { return clearTimeout(timeoutId); });
                                }),
                            ]);
                        }
                        else {
                            fetchPromise_1 = fetch(apiUrl, fetchOptions);
                        }
                        return [4 /*yield*/, fetchPromise_1];
                    case 2:
                        response = _c.sent();
                        if (!response.ok) {
                            setError("Network response was not ok");
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseData = _c.sent();
                        setData(responseData);
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _c.sent();
                        setError(error_1.message || "An error occurred");
                        return [3 /*break*/, 6];
                    case 5:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
        return function () {
            if (controller) {
                // Cleanup function to abort ongoing requests if component re-renders or unmounts
                controller.abort();
            }
        };
    }, []);
    return { data: data, error: error, isLoading: isLoading };
}
exports.useQuery = useQuery;
function getUrl(url, context) {
    if (url) {
        return url;
    }
    else if (context && context.url) {
        return context.url;
    }
    else {
        throw new Error("URL must be provided in useQuery or context.url must be set when Wrapping around QueryContext");
    }
}
