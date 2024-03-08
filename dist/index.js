"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientProviderConfig = exports.useQuery = exports.QueryProvider = void 0;
var provider_1 = __importDefault(require("./provider"));
exports.QueryProvider = provider_1.default;
var useQuery_1 = require("./useQuery");
Object.defineProperty(exports, "useQuery", { enumerable: true, get: function () { return useQuery_1.useQuery; } });
var providerClass_1 = __importDefault(require("./providerClass"));
exports.ClientProviderConfig = providerClass_1.default;
