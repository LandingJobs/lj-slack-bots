"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redisUrl = process.env.REDIS_URL;
const host = redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.split("@")[1].split(":")[0];
const port = Number(redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.split(":")[(redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.split(":").length) - 1]);
const username = redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.split(":")[2].split("@")[0];
const password = username;
exports.config = {
    host,
    port,
    username,
    password,
};
console.log(exports.config);
const connection = new ioredis_1.default(Object.assign(Object.assign({}, exports.config), { maxRetriesPerRequest: null, enableReadyCheck: false }));
exports.default = connection;
