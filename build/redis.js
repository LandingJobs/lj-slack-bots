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
exports.connection = new ioredis_1.default(redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy: (times) => (times < 10 ? times : null),
});
