"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const bots_1 = __importDefault(require("./bots"));
const redis_1 = __importDefault(require("./redis"));
function start() {
    const worker = new bullmq_1.Worker("bots", (job) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log(`running job ${job.name} (id: ${job.id})`);
        (_a = bots_1.default.find(({ jobName }) => jobName === job.name)) === null || _a === void 0 ? void 0 : _a.bot();
    }), { connection: (0, redis_1.default)() });
    console.log("worker", worker);
    worker.on("error", console.error);
}
start();
