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
const env_1 = require("../lib/env");
const isUserOnVacation_1 = __importDefault(require("../lib/isUserOnVacation"));
const pickRandom_1 = __importDefault(require("../lib/pickRandom"));
exports.cronTimer = env_1.prod
    ? "0 12 * * Monday"
    : "*/5 * * * *";
exports.botName = "steve";
const client = new web_api_1.WebClient(process.env.STEVE_API_TOKEN);
const sendGroupMessage = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { ok, channel, error } = yield client.conversations.open({
            users: users.join(", "),
        });
        if (!ok)
            throw error;
        ({ ok, error } = yield client.chat.postMessage({
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: ":portal_orange_parrot: *Hello girls and boys!!* :portal_blue_parrot:",
                    },
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "I know I seem loud, but don't mind me, I'm just taking a look around 👀",
                    },
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: 'You all have been chosen as our weekly :vercel: holy trinity :vercel:.\n\nThis means you\'re "recommended" (:rage:) to schedule a meeting between yourselves.\n\nShare something, become friends, have a nice sporty threeway boxing :boxing_glove: match, whatever!',
                    },
                },
            ],
            text: ":portal_blue_parrot: *Hello girls and boys!!* :portal_orange_parrot: I know I seem loud, but don't mind me, I'm just taking a look around 👀 You all have been chosen as our weekly :vercel: holy trinity :vercel:.\nThis just means that you are \"recommended\" (do it, or else...) to schedule a meeting between yourselves.\nShare something, become friends, have a nice sporty threeway boxing match, whatever!",
            channel: channel.id,
        }));
        if (!ok)
            throw error;
        console.log(`steve 🤖 - i'm done yelling at ${users.join(", ")} (sorry for the boring ids)`);
    }
    catch (error) {
        console.error(error);
    }
});
const pickRandomPeopleFromDifferentGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!env_1.prod)
        return ["U02DFN1AW3T"];
    try {
        const { ok, error, usergroups } = yield client.usergroups.list({
            include_disabled: false,
            include_users: true,
        });
        if (!ok)
            throw error;
        const groups = (0, pickRandom_1.default)(usergroups, 3);
        return yield Promise.all(groups.map((group) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            let [user] = (0, pickRandom_1.default)(group.users, 1);
            let userInfo = yield client.users.info({ user });
            while (!userInfo.ok || (0, isUserOnVacation_1.default)((_a = userInfo.user) === null || _a === void 0 ? void 0 : _a.profile)) {
                [user] = (0, pickRandom_1.default)(group.users, 1);
                userInfo = yield client.users.info({ user });
            }
            return user;
        })));
    }
    catch (error) {
        console.error(error);
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const selectedPeople = yield pickRandomPeopleFromDifferentGroups();
    if (selectedPeople === undefined)
        console.log("steve 🤖 - i wasn't able to yell at people!");
    else {
        sendGroupMessage(selectedPeople);
        console.log("steve 🤖 - i'm done yelling at people!");
    }
});
exports.default = main;
