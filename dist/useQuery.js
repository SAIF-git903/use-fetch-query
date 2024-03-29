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
var react_1 = require("react");
var helpers_1 = __importDefault(require("./helpers"));
var provider_1 = require("./provider");
function useQuery(options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var _a = (0, react_1.useState)(null), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var context = (0, react_1.useContext)(provider_1.QueryContext);
    var _d = options.method, defaultMethod = _d === void 0 ? "GET" : _d, _e = options.headers, defaultHeaders = _e === void 0 ? {} : _e, timeout = options.timeout, defaultQueryParams = options.queryParams, defaultUrl = options.url;
    var apiUrl = (0, helpers_1.default)(defaultUrl, context, defaultQueryParams);
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, responseData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setError(null);
                        if (!(defaultMethod === "GET")) return [3 /*break*/, 6];
                        setIsLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch(apiUrl, {
                                method: defaultMethod,
                                headers: __assign(__assign(__assign({ "Content-Type": "application/json" }, defaultHeaders), context === null || context === void 0 ? void 0 : context.defaultHeaders), { Authorization: (context === null || context === void 0 ? void 0 : context.authToken)
                                        ? "Bearer ".concat(context === null || context === void 0 ? void 0 : context.authToken)
                                        : undefined }),
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseData = _a.sent();
                        setData(responseData);
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
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
    }, [defaultMethod, defaultUrl, context]);
    var executeRequest = function (method, payload) { return __awaiter(_this, void 0, void 0, function () {
        var response, responseData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(apiUrl, {
                            method: method,
                            headers: __assign(__assign(__assign({ "Content-Type": "application/json" }, defaultHeaders), context === null || context === void 0 ? void 0 : context.defaultHeaders), { Authorization: (context === null || context === void 0 ? void 0 : context.authToken)
                                    ? "Bearer ".concat(context === null || context === void 0 ? void 0 : context.authToken)
                                    : undefined }),
                            body: JSON.stringify(payload),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseData = _a.sent();
                    setData(responseData);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    setError(error_2.message || "An error occurred");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var postData = function (payload) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, executeRequest("POST", payload)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var putData = function (payload) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, executeRequest("PUT", payload)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var patchData = function (payload) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, executeRequest("PATCH", payload)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return { data: data, error: error, isLoading: isLoading, postData: postData, putData: putData, patchData: patchData };
}
exports.useQuery = useQuery;
