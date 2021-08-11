"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.richmdCli = exports.richmd = void 0;
const index_1 = require("./parse/index");
const convert = require("./convert/index");
const parse = (text) => {
    const mdTree = index_1.default(text).ast;
    let htmlValue = "";
    let prev;
    let bqValue = [];
    let listValue = [];
    let orderListValue = [];
    for (const line in mdTree) {
        if (mdTree[line].name === "heading") {
            if (mdTree[line].values.length !== 0) {
                htmlValue += convert.heading(mdTree[line].level, mdTree[line].values[0].value);
            }
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "paragraph") {
            if (prev && prev.name === "blockquote") {
                bqValue.push(mdTree[line].values);
                if (mdTree[line] === mdTree[mdTree.length - 1]) {
                    htmlValue += convert.blockquote(bqValue);
                }
            }
            else {
                htmlValue += convert.paragraph(mdTree[line].values);
            }
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "blockquote") {
            bqValue.push(mdTree[line].values);
            prev = mdTree[line];
            if (mdTree[line] === mdTree[mdTree.length - 1]) {
                htmlValue += convert.blockquote(bqValue);
            }
        }
        else if (mdTree[line].name === "list") {
            listValue.push({ level: mdTree[line].level, values: mdTree[line].values });
            if (mdTree[line] === mdTree[mdTree.length - 1]) {
                htmlValue += convert.ulist(listValue);
            }
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "checklist") {
            listValue.push({ level: mdTree[line].level, values: mdTree[line].values, checked: mdTree[line].checked });
            if (mdTree[line] === mdTree[mdTree.length - 1]) {
                htmlValue += convert.checklist(listValue);
            }
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "orderedlist") {
            orderListValue.push(mdTree[line].values);
            if (mdTree[line] === mdTree[mdTree.length - 1]) {
                htmlValue += convert.orderedlist(orderListValue);
            }
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "code") {
            htmlValue += convert.code(mdTree[line]);
        }
        else if (mdTree[line].name === "horizontal") {
            htmlValue += convert.horizontal();
        }
        else if (mdTree[line].name === "table") {
            htmlValue += convert.table(mdTree[line]);
        }
        else if (mdTree[line].name === "katex") {
            htmlValue += convert.katex(mdTree[line]);
        }
        else if (mdTree[line].name === "color") {
            htmlValue += convert.colorBlock(mdTree[line]);
        }
        else if (mdTree[line].name === "startDetails") {
            htmlValue += convert.startDetails(mdTree[line].summary);
        }
        else if (mdTree[line].name === "endDetails") {
            htmlValue += convert.endDetails();
        }
        else if (mdTree[line].name === "startTag") {
            htmlValue += convert.startTag(mdTree[line]);
        }
        else if (mdTree[line].name === "endTag") {
            htmlValue += convert.endTag(mdTree[line]);
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "br") {
            if (bqValue.length !== 0) {
                htmlValue += convert.blockquote(bqValue);
                bqValue = [];
                continue;
            }
            else if (prev && prev.name === "list") {
                htmlValue += convert.ulist(listValue);
                listValue = [];
                continue;
            }
            else if (prev && prev.name === "orderedlist") {
                htmlValue += convert.orderedlist(orderListValue);
                orderListValue = [];
                continue;
            }
            else if (prev && prev.name === "checklist") {
                htmlValue += convert.checklist(listValue);
                listValue = [];
                continue;
            }
            else if (prev && prev.name === "br") {
                continue;
            }
            htmlValue += convert.br();
            prev = mdTree[line];
        }
    }
    return htmlValue;
};
const richmd = (text) => {
    return parse(text);
};
exports.richmd = richmd;
const richmdCli = (text) => {
    return parse(text);
};
exports.richmdCli = richmdCli;
