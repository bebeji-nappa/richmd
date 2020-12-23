# RichMD.js
RichMD.js make basic Markdown syntax convert to HTML and provide it customaized Markdown syntax.

![RichMD.js](./docs/images/preview.png)

## Installation

```bash
# use npm
npm install richmd

# use yarn
yarn add richmd
```

## Usage
Must be use [webpack](https://webpack.js.org/) to build RichMD.js, Please read Usage Documentations.
If you don't know usage webpack, reading [offical webpack documentation](https://webpack.js.org/concepts/).

- [Simple example using RichMD.js](./docs/usage.md)
- [Usage RichMD.js for React](./docs/usage-react.md)
- [Usage RichMD.js for Vue(v2)](./docs/usage-vue.md)

## Markdown Syntax
Please read a [RichMD.js Markdown Syntax Documentation](./docs/md-syntax.md).

### Suport syntax
- strong
- italic
- image
- link
- headings
- horizontal rule
- blockquote
- unordeed list
- ordered list
- strikethrough
- code block
- checkbox list
- table
- TeX syntax(Use [KaTeX](https://katex.org/))
- Color Inline Block
- Code block syntax highlight

## License
MIT

## Thanks you :pray:
- [Markdown-tree-parser](https://github.com/ysugimoto/markdown-tree-parser)
  - RichMD.js markdown parser was created using the code in markdown-tree-parser as a reference.
