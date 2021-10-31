"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var throng_1 = __importDefault(require("throng"));
var bull_1 = __importDefault(require("bull"));
var weeknd_1 = __importStar(require("./bots/weeknd"));
// Connect to a local redis instance locally, and the Heroku-provided URL in production
var REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
function start() {
    // Connect to the named work queue
    var workQueue = new bull_1.default("bots", REDIS_URL);
    var process = function (job) {
        if (job.data.bot === weeknd_1.jobId)
            (0, weeknd_1.default)();
    };
    workQueue.process(50, process);
}
// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
(0, throng_1.default)({ start: start });
