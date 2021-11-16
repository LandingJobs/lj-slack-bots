"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisUrl = process.env.REDIS_URL;
const host = redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.split("@")[1].split(":")[0];
const port = Number(redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.split(":")[(redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.split(":").length) - 1]);
const username = redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.split(":")[2].split("@")[0];
const password = username;
const config = {
    host,
    port,
    username,
    password,
};
console.log(config);
exports.default = config;
