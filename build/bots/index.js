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
Object.defineProperty(exports, "__esModule", { value: true });
var steve_1 = __importStar(require("./steve"));
var weeknd_1 = __importStar(require("./weeknd"));
var bots = [
    {
        botName: "weekndBot",
        bot: weeknd_1.default,
        jobId: weeknd_1.botName,
        cronTimer: weeknd_1.cronTimer,
    },
    {
        botName: "randomConvoBot",
        bot: steve_1.default,
        jobId: steve_1.botName,
        cronTimer: steve_1.cronTimer,
    },
];
exports.default = bots;
