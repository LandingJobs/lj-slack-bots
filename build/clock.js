"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bullmq_1 = require("bullmq");
var bots_1 = __importDefault(require("./bots"));
var redis_1 = require("./redis");
var scheduleBots = function () {
    var workQueue = new bullmq_1.Queue("bots", { connection: redis_1.connection });
    workQueue.drain();
    bots_1.default.forEach(function (_a) {
        var cronTimer = _a.cronTimer, botName = _a.botName;
        return workQueue.add(botName, {}, { repeat: { cron: cronTimer } });
    });
};
scheduleBots();
