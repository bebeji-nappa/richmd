# RichMD
![NPM](https://img.shields.io/npm/l/richmd)
![npm](https://img.shields.io/npm/v/richmd)
![npm](https://img.shields.io/npm/dw/richmd)

## What is RichMD?
RichMD is a tool for making Markdown richer.

![RichMD](./docs/images/preview.png)

## Installation

```bash
# use npm
$ npm install richmd

# use yarn
$ yarn add richmd
```

## Usage
### [New Release :tada:] RichMD file

RichMD has created a new file extension `.richmd` !

With the creation of this extension, the possibilities for RichMD are greatly expanded.
From now on, we are planning to develop around the RichMD file.

```bash
# Create Richmd file
$ touch hello.richmd
```

Using `richmd` makes it easy to use RichMD.
If you want to try using RichMD right away, this is useful. Let's a read Usage Documentation!
- [Usage the `richmd` command](./docs/usage-cli.md)

If you want to use React and Vue with RichMD, you need to build [webpack](https://webpack.js.org/). Please read Usage Documentations.
If you don't know usage webpack, reading [offical webpack documentation](https://webpack.js.org/concepts/).

- [Usage for React](./docs/usage-react.md)
- [Usage for Vue(v2)](./docs/usage-vue.md)


## Markdown Syntax
Please read a [RichMD Markdown Syntax Documentation](./docs/md-syntax.md).

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

### To be implemented in a future release
- Video
- Slide view mode
- Color text
- Dropdown list

## License
MIT

## Thank you :pray:
- [Markdown-tree-parser](https://github.com/ysugimoto/markdown-tree-parser)
  - RichMD markdown parser was created using the code in markdown-tree-parser as a reference.
