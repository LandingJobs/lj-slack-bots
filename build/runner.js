"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var throng_1 = __importDefault(require("throng"));
var bull_1 = __importDefault(require("bull"));
var weeknd_1 = __importDefault(require("./bots/weeknd"));
// Connect to a local redis instance locally, and the Heroku-provided URL in production
var REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
function start() {
    // Connect to the named work queue
    var workQueue = new bull_1.default("bots", REDIS_URL);
    var process = function (job) {
        if (job.data.bot === "weeknd")
            (0, weeknd_1.default)();
    };
    workQueue.process(50, process);
}
// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
(0, throng_1.default)({ start: start });
