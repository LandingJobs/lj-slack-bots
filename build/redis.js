"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var ioredis_1 = __importDefault(require("ioredis"));
var localRedisUrl = "redis://127.0.0.1";
var redisUrl = ((_a = process.env.REDIS_URL) === null || _a === void 0 ? void 0 : _a.slice(0, process.env.REDIS_URL.lastIndexOf(":"))) ||
    localRedisUrl;
var isLocal = redisUrl === localRedisUrl;
var port = isLocal ? 6379 : Number(redisUrl.split(":").at(-1));
exports.connection = new ioredis_1.default({
    host: redisUrl,
    port: port,
});
