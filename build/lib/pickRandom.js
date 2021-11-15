"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pickRandom = (arr, count = 3) => {
    const picked = [];
    while (picked.length < count) {
        const item = arr[Math.floor(Math.random() * arr.length)];
        if (picked.includes(item))
            continue;
        else
            picked.push(item);
    }
    return picked;
};
exports.default = pickRandom;
