"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var throng_1 = __importDefault(require("throng"));
var bull_1 = __importDefault(require("bull"));
var bots_1 = __importDefault(require("./bots"));
// Connect to a local redis instance locally, and the Heroku-provided URL in production
var REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
function start() {
    // Connect to the named work queue
    var workQueue = new bull_1.default("bots", REDIS_URL);
    var process = function (job) {
        var _a;
        (_a = bots_1.default.find(function (_a) {
            var jobId = _a.jobId;
            return jobId === job.data.bot;
        })) === null || _a === void 0 ? void 0 : _a.bot();
    };
    workQueue.process(50, process);
}
// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
(0, throng_1.default)({ start: start });
