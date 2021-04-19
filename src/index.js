const mtp = require("../lib/parse/index.js");
const convert = require("./convert/index.js");

exports.richmd = (text) => {
  return parse(text, convert);
};

// RIchMD CLI 用
exports.richmdCli = (text) => {
  return parse(text, convert)
};

const parse = (text, converter) => {
  const mdTree = mtp(text).ast;
  let htmlValue = ``;
  let prev = null;
  let bqValue = [];
  let listValue = [];
  for (const line of mdTree) {
    if (line.name === "heading") {
      if (line.values.length !== 0) {
        htmlValue += converter.heading(line.level, line.values[0].value);
      }
      prev = line;
    } else if (line.name === "paragraph") {
      if (prev && prev.name === "blockquote") {
        bqValue.push(line.values);
        if (line === mdTree[mdTree.length - 1]) {
          htmlValue += converter.blockquote(bqValue);
        }
      } else {
        htmlValue += converter.paragraph(line.values);
      }
      prev = line;
    } else if (line.name === "blockquote") {
      bqValue.push(line.values);
      prev = line;
      if (line === mdTree[mdTree.length - 1]) {
        htmlValue += converter.blockquote(bqValue);
      }
    } else if (line.name === "list") {
      listValue.push({ level: line.level, value: line.values });
      if (line === mdTree[mdTree.length - 1]) {
        htmlValue += converter.ulist(listValue);
      }
      prev = line;
    } else if (line.name === "checklist") {
      listValue.push({ level: line.level, value: line.values, checked: line.checked });
      if (line === mdTree[mdTree.length - 1]) {
        htmlValue += converter.checklist(listValue);
      }
      prev = line;
    } else if (line.name === "orderedlist") {
      listValue.push(line.values);
      if (line === mdTree[mdTree.length - 1]) {
        htmlValue += converter.orderedlist(listValue);
      }
      prev = line;
    } else if (line.name === "code") {
      htmlValue += converter.code(line);
    } else if (line.name === "horizontal") {
      htmlValue += converter.horizontal();
    } else if (line.name === "table") {
      htmlValue += converter.table(line);
    } else if (line.name === "katex") {
      htmlValue += converter.katex(line);
    } else if (line.name === "color") {
      htmlValue += converter.colorBlock(line);
    } else if (line.name === "startDetails") {
      htmlValue += converter.startDetails(line.summary);
    } else if (line.name === "endDetails") {
      htmlValue += converter.endDetails();
    } else if (line.name === "startTag") {
      htmlValue += convert.startTag(line);
    } else if (line.name === "endTag") {
      htmlValue += convert.endTag(line);
      prev = line;
    } else if (line.name === "br") {
      if (bqValue.length !== 0) {
        htmlValue += converter.blockquote(bqValue);
        bqValue = [];
        continue;
      } else if (prev && prev.name === "list") {
        htmlValue += converter.ulist(listValue);
        listValue = [];
        continue;
      } else if (prev && prev.name === "orderedlist") {
        htmlValue += converter.orderedlist(listValue);
        listValue = [];
        continue;
      } else if (prev && prev.name === "checklist") {
        htmlValue += converter.checklist(listValue);
        listValue = [];
        continue;
      } else if (prev && prev.name === "br") {
        continue;
      }
      htmlValue += converter.br();
      prev = line;
    }
  }
  return htmlValue;
}
