import nodes from '../nodes/block';
import helper from './helper';

const HEADING_REGEX = /^(#{1,})\s(.+)$/;
const ULIST_REGEX = /^(\s*)?(?:\-|\*)\s(.+)$/;
const OLIST_REGEX = /^(\s*)?([0-9]+)\.\s(.+)$/;
const HORIZONTAL_RULE_REGEX = /^[\*\-_\s]+$/;
const CODE_REGEX = /^[`~]{3}(.*)|[`~]{3}(.*)\b[\l]+\b$/;
const BLOCKQUOTE_REGEX = /^(>{1,})\s?(.+)$/;
const LINEBREAK_REGEX = /(.+?)[\u0020]{2}$/;
const TABLE_REGEX = /(?:\s*)?\|(.+)\|(?:\s*)$/;

const MODE_DEFAULT = 0;
const MODE_CODE = 1;

export const parser = str => {
  const ast = [];

  if (!/\n$/.test(str)) {
    str += '\n';
  }

  let stack = '';
  let line = '';
  let mode = MODE_DEFAULT;
  let tables = [];
  let match;
  let codeLang = '';

  const parseParagraph = stack => {
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

    if (char === '\r') {
      continue;
    }

    if (char === '\n') {
      if (null !== (match = line.match(LINEBREAK_REGEX))) {
        parseParagraph(stack + match[1]);
        stack = '';
      } else if (CODE_REGEX.test(line)) {
        if (mode === MODE_CODE) {
          ast.push(new nodes.Code(stack.trim(), codeLang));
          codeLang = ''
          mode = MODE_DEFAULT;
        } else {
          parseParagraph(stack);
          codeLang = line.replace(/\`\`\`/, '').trim();
          mode = MODE_CODE;
        }
        stack = '';
      } else if (null !== (match = line.match(BLOCKQUOTE_REGEX))) {
        parseParagraph(stack);
        stack = '';
        ast.push(new nodes.Blockquote(match[2], match[1].length));
      } else if (HORIZONTAL_RULE_REGEX.test(line) && line.split(/[\*\-_]/).length > 3) {
        parseParagraph(stack);
        stack = '';
        ast.push(new nodes.Horizontal());
      } else if (null !== (match = line.match(HEADING_REGEX))) {
        parseParagraph(stack);
        stack = '';
        ast.push(new nodes.Heading(match[2], match[1].length));
      } else if (null !== (match = line.match(ULIST_REGEX))) {
        parseParagraph(stack);
        stack = '';
        const prev = ast[ast.length - 1];
        const check = match[2].match(/^\[(x|\u0020)?\]\s(.+)$/);
        let level = 1;
        if (prev && (prev.name === 'list' || prev.name === 'checklist')) {
          const indent = (match[1] || '').length;
          if (prev.level * 2 <= indent) {
            level = prev.level + 1
          } else if (prev.level === indent) {
            level = prev.level
          } else if (indent === 0) {
            level = 1
          } else {
            level = prev.level - 1
          }
        }
        const list = check ? new nodes.CheckList(check[2], check[1] === 'x', level) : new nodes.List(match[2], level);
        ast.push(list);
      } else if (null !== (match = line.match(OLIST_REGEX))) {
        parseParagraph(stack);
        stack = '';
        const prev = ast[ast.length - 1];
        let level = 1;
        if (prev && (prev.name === 'orderedlist')) {
          const indent = (match[1] || '').length;
          if (prev.level * 2 <= indent) {
            level = prev.level + 1
          } else if (prev.level === indent) {
            level = prev.level
          } else {
            level = prev.level - 1
          }
        }
        const list = new nodes.OrderedList(match[3], (match[2] | 0), level);
        ast.push(list);
      } else if (null !== (match = line.match(TABLE_REGEX))) {
        tables.push(line);
        stack = '';
      } else if (line === '') {
        parseParagraph(stack);
        stack = '';
        ast.push(new nodes.Br());
      } else {
        stack += line !== '' ? `${line}\n` : '';
      }
      line = '';
    } else {
      line += char;
    }
  }
  parseParagraph(stack.slice(0, -1));
  return ast;
};
