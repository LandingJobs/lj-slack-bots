"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cron_1 = require("node-cron");
var bull_1 = __importDefault(require("bull"));
var bots_1 = __importDefault(require("./bots"));
var REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
var workQueue = new bull_1.default("bots", REDIS_URL);
bots_1.default.forEach(function (_a) {
    var cronTimer = _a.cronTimer, jobId = _a.jobId;
    (0, node_cron_1.schedule)(cronTimer, function () { return workQueue.add({ bot: jobId }); });
});
