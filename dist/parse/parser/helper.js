"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EMPTY_REGEX = /^\s*$/;
const isEmpty = (str) => {
    return str.length === 0 || EMPTY_REGEX.test(str);
};
exports.default = {
    isEmpty,
};
