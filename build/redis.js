"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const localRedisUrl = "redis://127.0.0.1:6379";
const redisUrl = (_a = process.env.REDIS_URL) !== null && _a !== void 0 ? _a : localRedisUrl;
const host = redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.slice(0, redisUrl.lastIndexOf(":"));
const port = Number(redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.slice(redisUrl.lastIndexOf(":") + 1));
console.log(host, port);
exports.connection = new ioredis_1.default({
    host,
    port,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});
