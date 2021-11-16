"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const node_cron_1 = require("node-cron");
const bots_1 = __importDefault(require("./bots"));
const redis_1 = __importDefault(require("./redis"));
const scheduleBots = () => {
    const workQueue = new bullmq_1.Queue("bots", { connection: (0, redis_1.default)() });
    console.log("draining the existing queue");
    workQueue.drain();
    bots_1.default.forEach(({ cronTimer, jobName, botName }) => {
        console.log(`scheduling bot ${botName} to run on cron ${cronTimer}`);
        (0, node_cron_1.schedule)(cronTimer, () => workQueue.add(jobName, {}));
    });
};
scheduleBots();
