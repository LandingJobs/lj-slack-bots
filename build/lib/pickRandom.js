"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pickRandom = function (arr, count) {
    if (count === void 0) { count = 3; }
    var picked = [];
    while (picked.length < count) {
        var item = arr[Math.floor(Math.random() * arr.length)];
        if (picked.includes(item))
            continue;
        else
            picked.push(item);
    }
};
exports.default = pickRandom;
