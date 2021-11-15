"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var ioredis_1 = __importDefault(require("ioredis"));
var LOCAL_REDIS_URL = "redis://127.0.0.1";
var REDIS_URL = process.env.REDIS_URL || LOCAL_REDIS_URL;
var isLocal = REDIS_URL === LOCAL_REDIS_URL;
exports.connection = new ioredis_1.default({ host: REDIS_URL, port: isLocal ? 6379 : undefined });
