"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
const inline_1 = require("../parser/inline");
const inline_2 = require("./inline");
const syntax_error_1 = require("../parser/syntax-error");
class Import extends Node_1.default {
    constructor(text) {
        super("import", "block");
        this.value = text;
    }
}
class Paragraph extends Node_1.default {
    constructor(text) {
        super("paragraph", "block");
        this.values = inline_1.default(text);
    }
}
class Horizontal extends Node_1.default {
    constructor() {
        super("horizontal", "block");
    }
}
class Br extends Node_1.default {
    constructor() {
        super("br", "block");
    }
}
class Code extends Node_1.default {
    constructor(text, syntax, file) {
        super("code", "block");
        this.syntax = syntax;
        this.file = file;
        this.values = [new inline_2.default.Text(text)];
    }
}
class Katex extends Node_1.default {
    constructor(text) {
        super("katex", "block");
        this.values = [new inline_2.default.Text(text)];
    }
}
class ColorBlock extends Node_1.default {
    constructor(text, style) {
        super("color", "block");
        this.style = style;
        this.values = inline_1.default(text);
    }
}
class Blockquote extends Node_1.default {
    constructor(text, level) {
        super("blockquote", "block");
        this.level = level;
        this.values = inline_1.default(text);
    }
}
class Heading extends Node_1.default {
    constructor(text, level) {
        if (level === 0 || level > 6) {
            throw new syntax_error_1.default("Invalid heading: heading support only between H1 and H6");
        }
        super("heading", "block");
        this.level = level;
        this.values = inline_1.default(text);
    }
}
class List extends Node_1.default {
    constructor(text, level) {
        super("list", "block");
        this.level = level;
        this.values = inline_1.default(text);
    }
}
class OrderedList extends Node_1.default {
    constructor(text, order, level) {
        super("orderedlist", "block");
        this.level = level;
        this.order = order;
        this.values = inline_1.default(text);
    }
}
class CheckList extends Node_1.default {
    constructor(text, checked, level) {
        super("checklist", "block");
        this.level = level;
        this.checked = checked;
        this.values = inline_1.default(text);
    }
}
class Table extends Node_1.default {
    constructor(_rows) {
        super("table", "block");
        this.headings = [];
        this.aligns = [];
        this.rows = [];
        const [heading, separator, ...rows] = _rows.map((line) => line.replace(/^\||\|$/g, "").split("|"));
        if (heading !== undefined) {
            this.headings = heading.map((cell) => cell.trim());
        }
        if (separator !== undefined) {
            this.aligns = separator.map((cell) => {
                cell = cell.trim();
                let align = "left";
                if (cell[cell.length - 1] === ":") {
                    align = cell[0] === ":" ? "center" : "right";
                }
                return align;
            });
        }
        if (rows !== undefined) {
            this.rows = rows.map((row) => {
                return row.map((cell) => inline_1.default(cell.trim()));
            });
        }
    }
}
class StartDetails extends Node_1.default {
    constructor(text) {
        super("startDetails", "block");
        this.summary = text;
    }
}
class EndDetails extends Node_1.default {
    constructor() {
        super("endDetails", "block");
    }
}
class StartTag extends Node_1.default {
    constructor(tag, style) {
        super("startTag", "block");
        this.style = style;
        this.tag = tag;
    }
}
class EndTag extends Node_1.default {
    constructor(tag) {
        super("endTag", "block");
        this.tag = tag;
    }
}
exports.default = {
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
    EndTag,
};
