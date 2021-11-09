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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobId = exports.cronTimer = void 0;
var web_api_1 = require("@slack/web-api");
var pickRandom_1 = __importDefault(require("../lib/pickRandom"));
var isUserOnVacation_1 = __importDefault(require("../lib/isUserOnVacation"));
var getUser_1 = __importDefault(require("../lib/getUser"));
// export const cronTimer = "0 11 * * Monday"; // every monday at 11am
exports.cronTimer = "*/3 * * * *"; // testing
exports.jobId = "weeknd";
var client = new web_api_1.WebClient(process.env.WEEKND_API_TOKEN);
var sendMessage = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ok, error, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.chat.postMessage({
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
                    })];
            case 1:
                _a = _d.sent(), ok = _a.ok, error = _a.error;
                if (!ok)
                    throw error;
                console.log("weeknd \uD83E\uDD16 - i'm done yelling at " + ((_c = (_b = user.real_name) !== null && _b !== void 0 ? _b : user.name) !== null && _c !== void 0 ? _c : "someone(?)"));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _d.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var pickRandomPeople = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ok, members, error, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.users.list()];
            case 1:
                _a = _b.sent(), ok = _a.ok, members = _a.members, error = _a.error;
                if (!ok)
                    throw error;
                return [2 /*return*/, (0, pickRandom_1.default)(members.filter(function (_a) {
                        var deleted = _a.deleted, is_workflow_bot = _a.is_workflow_bot, is_bot = _a.is_bot, is_app_user = _a.is_app_user, profile = _a.profile;
                        return !deleted &&
                            !is_app_user &&
                            !is_bot &&
                            !is_workflow_bot &&
                            !(0, isUserOnVacation_1.default)(profile);
                    }), 3)];
            case 2:
                error_2 = _b.sent();
                console.error(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var selectedPeople;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, getUser_1.default)("U02DFN1AW3T", client)];
            case 1:
                selectedPeople = [_a.sent()];
                if (selectedPeople === undefined)
                    console.log("weeknd 🤖 - i wasn't able to yell at people!");
                else {
                    selectedPeople
                        .filter(function (user) { return user !== undefined; })
                        .forEach(function (user) { return sendMessage(user); });
                    console.log("weeknd 🤖 - i'm done yelling at people!");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.default = main;
