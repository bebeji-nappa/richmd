import Node from "./Node";

const IMAGE_REGEX = /^!\[([^\]]*)?\]\(([^\)]+)\)$/;
const VIDEO_REGEX = /^@\[([^\]]*)?\]\(([^\)]+)\)$/;
const LINK_REGEX = /^\[([^\]]*)?\]\(([^\)]+)\)$/;

class Text extends Node {
  value: string
  constructor(text) {
    super("text", "inline");
    this.value = text;
  }
}

class Html extends Node {
  value: string
  constructor(text) {
    super("html", "inline");
    this.value = text;
  }
}

class HtmlComment extends Node {
  value: string
  constructor(text) {
    super("htmlcomment", "inline");
    this.value = text;
  }
}

class Em extends Node {
  value: string
  constructor(text) {
    super("em", "inline");
    this.value = text;
  }
}

class Italic extends Node {
  value: string
  constructor(text) {
    super("italic", "inline");
    this.value = text;
  }
}
class EmItalic extends Node {
  value: string
  constructor(text) {
    super("emitalic", "inline");
    this.value = text;
  }
}
class Strikethrough extends Node {
  value: string
  constructor(text) {
    super("strikethrough", "inline");
    this.value = text;
  }
}

class InlineCode extends Node {
  value: string
  constructor(text) {
    super("code", "inline");
    this.value = text;
  }
}

class Image extends Node {
  alt: string
  src: string
  constructor(text) {
    const match = text.match(IMAGE_REGEX);
    super("image", "inline");
    if (!match) {
      this.alt = "";
      this.src = "";
    } else {
      this.alt = match[1] || "";
      this.src = match[2] || "";
    }
  }
}

class Video extends Node {
  src: string
  constructor(text) {
    const match = text.match(VIDEO_REGEX);
    super("video", "inline");
    if (!match) {
      this.src = "";
    } else {
      this.src = match[2] || "";
    }
  }
}

class Link extends Node {
  title: string
  href: string
  constructor(text) {
    const match = text.match(LINK_REGEX);
    super("link", "inline");
    if (!match) {
      this.title = "";
      this.href = "";
    } else {
      this.title = match[1] || "";
      this.href = match[2] || "";
    }
  }
}

class InlineKatex extends Node {
  value: string
  constructor(text) {
    super("katex", "inline");
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
  Video,
  Link,
  InlineKatex,
};
