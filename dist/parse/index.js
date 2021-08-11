"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const block_1 = require("./parser/block");
const Tree_1 = require("./Tree");
exports.default = (mdString) => {
    const ast = block_1.parser(mdString);
    return new Tree_1.default(ast);
};
exports.parse = block_1.parser;
