import Node from './Node.js';

const IMAGE_REGEX = /^!\[([^\]]*)?\]\(([^\)]+)\)$/;
const LINK_REGEX = /^\[([^\]]*)?\]\(([^\)]+)\)$/;

class Text extends Node {
  constructor(text) {
    super('text', 'inline');
    this.value = text;
  }
}

class Html extends Node {
  constructor(text) {
    super('html', 'inline');
    this.value = text;
  }
}

class HtmlComment extends Node {
  constructor(text) {
    super('htmlcomment', 'inline');
    this.value = text;
  }
}

class Em extends Node {
  constructor(text) {
    super('em', 'inline');
    this.value = text;
  }
}

class Italic extends Node {
  constructor(text) {
    super('italic', 'inline');
    this.value = text;
  }
}
class EmItalic extends Node {
  constructor(text) {
    super('emitalic', 'inline');
    this.value = text;
  }
}
class Strikethrough extends Node {
  constructor(text) {
    super('strikethrough', 'inline');
    this.value = text;
  }
}

class InlineCode extends Node {
  constructor(text) {
    super('code', 'inline');
    this.value = text;
  }
}

class Image extends Node {
  constructor(text) {
    const match = text.match(IMAGE_REGEX);
    super('image', 'inline');
    if (!match) {
      this.alt = '';
      this.src = '';
    } else {
      this.alt = match[1] || '';
      this.src = match[2] || '';
    }
    
  }
}

class Link extends Node {
  constructor(text) {
    const match = text.match(LINK_REGEX);
    super('link', 'inline');
    if (!match) {
      this.title = '';
      this.href = '';
    } else {
      this.title = match[1] || '';
      this.href = match[2] || '';
    }
    
  }
}

class InlineKatex extends Node {
  constructor(text) {
    super('katex', 'inline');
    this.value = text;
  }
}

export default {
  Text,
  Html,
  HtmlComment,
  Em,
  Italic,
  EmItalic,
  Strikethrough,
  InlineCode,
  Image,
  Link,
  InlineKatex
};
