const nodes = require("../nodes/block.js");
const helper = require("./helper.js");

const HEADING_REGEX = /^(#{1,})\s(.+)$/;
const ULIST_REGEX = /^(\s*)?(?:\-|\*)\s(.+)$/;
const OLIST_REGEX = /^(\s*)?([0-9]+)\.\s(.+)$/;
const HORIZONTAL_RULE_REGEX = /^[\*\-_\s]+$/;
const CODE_REGEX = /^[`~]{3}(.*)|[`~]{3}(.*)\b[\l]+\b\:\b[\u\l]+\b$/;
const BLOCKQUOTE_REGEX = /^(>{1,})\s?(.+)$/;
const LINEBREAK_REGEX = /(.+?)[\u0020]{2}$/;
const TABLE_REGEX = /(?:\s*)?\|(.+)\|(?:\s*)$/;
const KATEX_REGEX = /^[\$]{3}(.*)|[\$]{3}(.*)$/;
const COLORBLOCK_REGEX = /^[\=]{3}(.*)|[\=]{3}(.*)\b[\l]+\b$/;
const IMPORT_REGEX = /^\:style\:[\w_\.\/]*$/;
const START_DETAILS_REGEX = /^\:\>\b[\w_\.\/]+\b$/;
const END_DETAILS_REGEX = /^\:\>$/;
const START_TAG_REGEX = /^\:\:\b[a-z]+\b|\:\:\b[a-z]+\b\.\b[a-z]+\b$/;
const END_TAG_REGEX = /^\:\:$/;

const MODE_DEFAULT = 0;
const MODE_CODE = 1;
const MODE_KATEX = 2;
const MODE_COLORBLOCK = 3;

let tagData = "";

exports.parser = (str) => {
  const ast = [];

  if (!/\n$/.test(str)) {
    str += "\n";
  }

  let stack = "";
  let line = "";
  let mode = MODE_DEFAULT;
  let tables = [];
  let match;
  let codeLang = "";
  let filename = "";
  let messageType = "default";
  const parseParagraph = (stack) => {
    if (tables.length > 0) {
      ast.push(new nodes.Table(tables));
      tables = [];
    }
    if (!helper.isEmpty(stack)) {
      ast.push(new nodes.Paragraph(stack));
    }
  };

  for (let i = 0; i < str.length; ++i) {
    const char = str[i];

    if (char === "\r") {
      continue;
    }

    if (char === "\n") {
      if (IMPORT_REGEX.test(line)) {
        const importPath = line.replace(/\:style\:/, "").trim();
        ast.push(new nodes.Import(importPath));
        stack = "";
      } else if (START_DETAILS_REGEX.test(line)) {
        parseParagraph(stack);
        const summaryData = line.replace(/\:\>/, "").trim();
        ast.push(new nodes.StartDetails(summaryData));
        stack = "";
      } else if (END_DETAILS_REGEX.test(line)) {
        parseParagraph(stack);
        ast.push(new nodes.EndDetails());
        stack = "";
      } else if (START_TAG_REGEX.test(line)) {
        parseParagraph(stack);
        tagData = line.replace(/\:\:/, "").trim().split(`\.`);
        ast.push(new nodes.StartTag(tagData[0], tagData[1]));
        stack = "";
      } else if (END_TAG_REGEX.test(line)) {
        parseParagraph(stack);
        ast.push(new nodes.EndTag(tagData[0]));
        stack = "";
      } else if (null !== (match = line.match(LINEBREAK_REGEX))) {
        parseParagraph(stack + match[1]);
        stack = "";
      } else if (CODE_REGEX.test(line)) {
        if (mode === MODE_CODE) {
          ast.push(new nodes.Code(stack.trim(), codeLang, filename));
          codeLang = "";
          filename = "";
          mode = MODE_DEFAULT;
        } else {
          parseParagraph(stack);
          const codeData = line
            .replace(/\`\`\`/, "")
            .trim()
            .split(`\:`);
          codeLang = codeData[0];
          filename = codeData[1];
          mode = MODE_CODE;
        }
        stack = "";
      } else if (KATEX_REGEX.test(line)) {
        if (mode === MODE_KATEX) {
          ast.push(new nodes.Katex(stack.trim()));
          mode = MODE_DEFAULT;
        } else {
          parseParagraph(stack);
          mode = MODE_KATEX;
        }
        stack = "";
      } else if (COLORBLOCK_REGEX.test(line)) {
        if (mode === MODE_COLORBLOCK) {
          ast.push(new nodes.ColorBlock(stack.trim(), messageType));
          messageType = "default";
          mode = MODE_DEFAULT;
        } else {
          parseParagraph(stack);
          messageType = line.replace(/\=\=\=/, "").trim();
          if (messageType === "") {
            messageType = "default";
          }
          mode = MODE_COLORBLOCK;
        }
        stack = "";
      } else if (null !== (match = line.match(BLOCKQUOTE_REGEX))) {
        parseParagraph(stack);
        stack = "";
        ast.push(new nodes.Blockquote(match[2], match[1].length));
      } else if (HORIZONTAL_RULE_REGEX.test(line) && line.split(/[\*\-_]/).length > 3) {
        parseParagraph(stack);
        stack = "";
        ast.push(new nodes.Horizontal());
      } else if (null !== (match = line.match(HEADING_REGEX))) {
        parseParagraph(stack);
        stack = "";
        ast.push(new nodes.Heading(match[2], match[1].length));
      } else if (null !== (match = line.match(ULIST_REGEX))) {
        parseParagraph(stack);
        const prev = ast[ast.length - 1];
        const check = match[2].match(/^\[(x|\u0020)?\]\s(.+)$/);
        let level = 1;
        if (prev && (prev.name === "list" || prev.name === "checklist")) {
          const indent = (match[1] || "").length;
          if (indent % 2 === 0) {
            if (prev.level * 2 <= indent) {
              level = prev.level + 1;
            } else if ((prev.level - 1) * 2 === indent) {
              level = prev.level;
            } else if (indent === 0) {
              level = 1;
            } else if (prev.level * 2 > indent) {
              level = prev.level - 1;
            }
          } else {
            continue;
          }
        }
        const list = check ? new nodes.CheckList(check[2], check[1] === "x", level) : new nodes.List(match[2], level);
        ast.push(list);
        stack = "";
      } else if (null !== (match = line.match(OLIST_REGEX))) {
        parseParagraph(stack);
        let level = 1;
        const list = new nodes.OrderedList(match[3], match[2] | 0, level);
        ast.push(list);
        stack = "";
      } else if (null !== (match = line.match(TABLE_REGEX))) {
        tables.push(line);
        stack = "";
      } else if (line === "") {
        if (mode === MODE_DEFAULT) {
          parseParagraph(stack);
          ast.push(new nodes.Br());
          stack = "";
        }
      } else {
        stack += line !== "" ? `${line}\n` : "";
      }
      line = "";
    } else {
      line += char;
    }
  }
  parseParagraph(stack.slice(0, -1));
  return ast;
};
