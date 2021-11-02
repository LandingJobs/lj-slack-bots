"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avoidStatuses = void 0;
exports.avoidStatuses = ["Vacationing", "Vacations", "Out of office"];
var isUserOnVacation = function (profile) { var _a; return !exports.avoidStatuses.includes((_a = profile === null || profile === void 0 ? void 0 : profile.status_text) !== null && _a !== void 0 ? _a : ""); };
exports.default = isUserOnVacation;
