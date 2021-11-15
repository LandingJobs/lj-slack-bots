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
exports.botName = exports.cronTimer = void 0;
const web_api_1 = require("@slack/web-api");
const pickRandom_1 = __importDefault(require("../lib/pickRandom"));
const isUserOnVacation_1 = __importDefault(require("../lib/isUserOnVacation"));
const getUser_1 = __importDefault(require("../lib/getUser"));
exports.cronTimer = "*/3 * * * *";
exports.botName = "weeknd";
const client = new web_api_1.WebClient(process.env.WEEKND_API_TOKEN);
const sendMessage = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { ok, error } = yield client.chat.postMessage({
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "🎉🎉🎉 *You are the lucky winner!!* 🎉🎉🎉",
                    },
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "You've been chosen to share _\"voluntarily\"_ some pictures 📷 of your super fun weekend.\nIf you're weekend wasn't fun, get some stock pictures from Google 🤪",
                    },
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "Share them right now!! (on the #random channel)",
                    },
                },
            ],
            text: "🎉🎉🎉 *You are the lucky winner!!* 🎉🎉🎉 You've been chosen to share _\"voluntarily\"_ some pictures 📷 of your super fun weekend.\nIf you're weekend wasn't fun, get some stock pictures from Google 🤪 Share them right now!! (on the #random channel).",
            channel: user.id,
        });
        if (!ok)
            throw error;
        console.log(`weeknd 🤖 - i'm done yelling at ${(_b = (_a = user.real_name) !== null && _a !== void 0 ? _a : user.name) !== null && _b !== void 0 ? _b : "someone(?)"}`);
    }
    catch (error) {
        console.error(error);
    }
});
const pickRandomPeople = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ok, members, error } = yield client.users.list();
        if (!ok)
            throw error;
        return (0, pickRandom_1.default)(members.filter(({ deleted, is_workflow_bot, is_bot, is_app_user, profile }) => !deleted &&
            !is_app_user &&
            !is_bot &&
            !is_workflow_bot &&
            !(0, isUserOnVacation_1.default)(profile)), 3);
    }
    catch (error) {
        console.error(error);
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const selectedPeople = [yield (0, getUser_1.default)("U02DFN1AW3T", client)];
    if (selectedPeople === undefined)
        console.log("weeknd 🤖 - i wasn't able to yell at people!");
    else {
        selectedPeople
            .filter((user) => user !== undefined)
            .forEach((user) => sendMessage(user));
        console.log("weeknd 🤖 - i'm done yelling at people!");
    }
});
exports.default = main;
