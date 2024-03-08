"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryContext = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
exports.QueryContext = (0, react_2.createContext)(null);
function QueryProvider(_a) {
    var _b;
    var children = _a.children, client = _a.client;
    return (react_1.default.createElement(exports.QueryContext.Provider, { value: (_b = client) !== null && _b !== void 0 ? _b : "" }, children));
}
exports.default = QueryProvider;
