"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const host = process.env.REDIS_HOST;
const port = Number(process.env.REDIS_PORT);
const username = process.env.REDIS_USERNAME;
const password = process.env.REDIS_PASSWORD;
console.log(`connecting to redis on host ${host} and port ${port}`);
exports.connection = new ioredis_1.default({
    host,
    port,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    username,
    password,
});
