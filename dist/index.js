import mtp from "./parse/index";
import * as convert from "./convert/index";
const parse = (text, converter) => {
    const mdTree = mtp(text).ast;
    let htmlValue = "";
    let prev;
    let bqValue = [];
    let listValue = [];
    for (const line in mdTree) {
        if (mdTree[line].name === "heading") {
            if (mdTree[line].values.length !== 0) {
                htmlValue += converter.heading(mdTree[line].level, mdTree[line].values[0].value);
            }
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "paragraph") {
            if (prev && prev.name === "blockquote") {
                bqValue.push(mdTree[line].values);
                if (mdTree[line] === mdTree[mdTree.length - 1]) {
                    htmlValue += converter.blockquote(bqValue);
                }
            }
            else {
                htmlValue += converter.paragraph(mdTree[line].values);
            }
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "blockquote") {
            bqValue.push(mdTree[line].values);
            prev = mdTree[line];
            if (mdTree[line] === mdTree[mdTree.length - 1]) {
                htmlValue += converter.blockquote(bqValue);
            }
        }
        else if (mdTree[line].name === "list") {
            listValue.push({ level: mdTree[line].level, value: mdTree[line].values });
            if (mdTree[line] === mdTree[mdTree.length - 1]) {
                htmlValue += converter.ulist(listValue);
            }
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "checklist") {
            listValue.push({ level: mdTree[line].level, value: mdTree[line].values, checked: mdTree[line].checked });
            if (mdTree[line] === mdTree[mdTree.length - 1]) {
                htmlValue += converter.checklist(listValue);
            }
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "orderedlist") {
            listValue.push(mdTree[line].values);
            if (mdTree[line] === mdTree[mdTree.length - 1]) {
                htmlValue += converter.orderedlist(listValue);
            }
            prev = mdTree[line];
        }
        else if (mdTree[line].name === "code") {
            htmlValue += converter.code(mdTree[line]);
        }
        else if (mdTree[line].name === "horizontal") {
            htmlValue += converter.horizontal();
        }
        else if (mdTree[line].name === "table") {
            htmlValue += converter.table(mdTree[line]);
        }
        else if (mdTree[line].name === "katex") {
            htmlValue += converter.katex(mdTree[line]);
        }
        else if (mdTree[line].name === "color") {
            htmlValue += converter.colorBlock(mdTree[line]);
        }
        else if (mdTree[line].name === "startDetails") {
            htmlValue += converter.startDetails(mdTree[line].summary);
        }
        else if (mdTree[line].name === "endDetails") {
            htmlValue += converter.endDetails();
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
                htmlValue += converter.blockquote(bqValue);
                bqValue = [];
                continue;
            }
            else if (prev && prev.name === "list") {
                htmlValue += converter.ulist(listValue);
                listValue = [];
                continue;
            }
            else if (prev && prev.name === "orderedlist") {
                htmlValue += converter.orderedlist(listValue);
                listValue = [];
                continue;
            }
            else if (prev && prev.name === "checklist") {
                htmlValue += converter.checklist(listValue);
                listValue = [];
                continue;
            }
            else if (prev && prev.name === "br") {
                continue;
            }
            htmlValue += converter.br();
            prev = mdTree[line];
        }
    }
    return htmlValue;
};
export const richmd = (text) => {
    return parse(text, convert);
};
