const Node = require("./Node.js");
const inlineParser = require("../parser/inline.js");
const inline = require("./inline.js");
const SyntaxError = require("../parser/syntax-error.js");


class Import extends Node {
  constructor(text) {
    super('import', 'block');
    this.value = text;
  }
}

class Paragraph extends Node {
  constructor(text) {
    super('paragraph', 'block');
    this.values = inlineParser(text);
  }
}

class Horizontal extends Node {
  constructor() {
    super('horizontal', 'block');
  }
}

class Br extends Node {
  constructor() {
    super('br', 'block');
  }
}

class Code extends Node {
  constructor(text, syntax, file) {
    super('code', 'block');
    this.syntax = syntax;
    this.file = file;
    this.values = [
      new inline.Text(text)
    ];
  }
}

class Katex extends Node {
  constructor(text) {
    super('katex', 'block');
    this.values = [
      new inline.Text(text)
    ];
  }
}

class ColorBlock extends Node {
  constructor(text, style) {
    super('color', 'block');
    this.style = style;
    this.values = inlineParser(text);
  }
}

class Blockquote extends Node {
  constructor(text, level) {
    super('blockquote', 'block');
    this.level = level;
    this.values = inlineParser(text);
  }
}

class Heading extends Node {
  constructor(text, level) {
    if (level === 0 || level > 6) {
      throw new SyntaxError('Invalid heading: heading support only between H1 and H6');
    }
    super('heading', 'block');
    this.level = level;
    this.values = inlineParser(text);
  }
}

class List extends Node {
  constructor(text, level) {
    super('list', 'block');
    this.level = level;
    this.values = inlineParser(text);
  }
}

class OrderedList extends Node {
  constructor(text, order, level) {
    super('orderedlist', 'block');
    this.level = level;
    this.order = order;
    this.values = inlineParser(text);
  }
}

class CheckList extends Node {
  constructor(text, checked, level) {
    super('checklist', 'block');
    this.level = level;
    this.checked = checked;
    this.values = inlineParser(text);
  }
}

class Table extends Node {
  constructor(_rows) {
    super('table', 'block');
    const [heading, separator, ...rows] = _rows.map(line => line.replace(/^\||\|$/g, '').split('|'));
    if(heading !== undefined) {
      this.headings = heading.map(cell => cell.trim());
    }
    if (separator !== undefined) {
      this.aligns = separator.map(cell => {
        cell = cell.trim();
        let align = 'left';
        if (cell[cell.length - 1] === ':') {
          align = cell[0] === ':' ? 'center': 'right';
        }
        return align;
      });
    }
    if (rows !== undefined) {
      this.rows = rows.map(row => {
        return row.map(cell => inlineParser(cell.trim()));
      });
    }
  }
}

class StartDetails extends Node {
  constructor(text) {
    super('startDetails', 'block');
    this.summary = text;
  }
}

class EndDetails extends Node {
  constructor() {
    super('endDetails', 'block');
  }
}

class StartTag extends Node {
  constructor(tag, style) {
    super('startTag', 'block');
    this.style = style;
    this.tag = tag;
  }
}

class EndTag extends Node {
  constructor(tag) {
    super('endTag', 'block');
    this.tag = tag;
  }
}

module.exports = {
  Paragraph,
  Horizontal,
  Code,
  Katex,
  ColorBlock,
  Blockquote,
  Heading,
  List,
  CheckList,
  OrderedList,
  Table,
  Br,
  Import,
  StartDetails,
  EndDetails,
  StartTag,
  EndTag
};
