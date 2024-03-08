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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
var axios_1 = __importDefault(require("axios"));
var react_1 = require("react");
var provider_1 = require("./provider");
function useQuery(options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var _a = (0, react_1.useState)(null), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var context = (0, react_1.useContext)(provider_1.QueryContext);
    (0, react_1.useEffect)(function () {
        var source = axios_1.default.CancelToken.source();
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var apiUrl, _a, method, _b, headers, body, timeout, axiosOptions, response, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        setIsLoading(true);
                        setError(null);
                        if (!(options.method === "GET")) return [3 /*break*/, 5];
                        apiUrl = getUrl(options.url, context);
                        _a = options.method, method = _a === void 0 ? "GET" : _a, _b = options.headers, headers = _b === void 0 ? {} : _b, body = options.body, timeout = options.timeout;
                        axiosOptions = {
                            method: method,
                            headers: __assign(__assign(__assign({ "Content-Type": "application/json" }, headers), context === null || context === void 0 ? void 0 : context.defaultHeaders), { Authorization: (context === null || context === void 0 ? void 0 : context.authToken)
                                    ? "Bearer ".concat(context === null || context === void 0 ? void 0 : context.authToken)
                                    : null }),
                            cancelToken: source.token,
                        };
                        if (method !== "GET") {
                            axiosOptions.data = body;
                        }
                        if (timeout && method !== "GET") {
                            axiosOptions.timeout = timeout;
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, (0, axios_1.default)(apiUrl, axiosOptions)];
                    case 2:
                        response = _c.sent();
                        setData(response.data);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _c.sent();
                        if (axios_1.default.isCancel(error_1)) {
                            // Request cancelled, no need to set error
                        }
                        else if (error_1.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            setError("Network response was not ok");
                        }
                        else if (error_1.request) {
                            // The request was made but no response was received
                            setError("No response received");
                        }
                        else {
                            // Something happened in setting up the request that triggered an Error
                            setError("An error occurred");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
        return function () {
            source.cancel("Component unmounted");
        };
    }, [options.method, options.url, context]);
    // Function to make a POST request
    var postData = function (payload) { return __awaiter(_this, void 0, void 0, function () {
        var apiUrl, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    apiUrl = getUrl(options.url, context);
                    return [4 /*yield*/, axios_1.default.post(apiUrl, payload, {
                            headers: __assign(__assign(__assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers), context === null || context === void 0 ? void 0 : context.defaultHeaders), { Authorization: (context === null || context === void 0 ? void 0 : context.authToken)
                                    ? "Bearer ".concat(context === null || context === void 0 ? void 0 : context.authToken)
                                    : null }),
                        })];
                case 1:
                    response = _a.sent();
                    setData(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    setError(error_2.message || "An error occurred");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return { data: data, error: error, isLoading: isLoading, postData: postData };
}
exports.useQuery = useQuery;
function getUrl(url, context, queryParams) {
    if (!url && (!context || !context.url)) {
        throw new Error("URL must be provided in useQuery or context.url must be set when Wrapping around QueryContext");
    }
    var $URL = url || context.url;
    var queryString = "";
    if (queryParams) {
        var params = Object.entries(queryParams)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(value));
        })
            .join("&");
        queryString = "?".concat(params);
    }
    return "".concat($URL).concat(queryString);
}
