# Richmd.js
Richmd.js make basic Markdown syntax convert to HTML and provide it customaized Markdown syntax.

## Installation

```bash
# use npm
npm install richmd

# use yarn
yarn add richmd
```

## Usage
You can use Richmd.js as a ECMAScript module.

Import method `richmd` to Entry file.
```js
import { richmd } from 'richmd';

const text = `# heading 1`

console.log(richmd(text)) // Markdown convert to HTML
```

### [MUST] SetUp TeX Syntax 
Richmd.js can use TeX Syntax. This tool use [KaTeX](https://katex.org/). 

Plaese add this CDN to HTML template file.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js" integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js" integrity="sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa" crossorigin="anonymous"
    onload="renderMathInElement(document.body);"></script>
```

**You must be set up TeX Syntax. If You don't set up this, There is a possibility that it will not work properly.** 

*This problem will be resolved by future version.*

### Vue.js Simple Example
```js
<template>
  <form id="post-form">
    <div id="editor">
      <textarea v-model="markdownText" class="textField"></textarea>
    </div>
    <div id="preview">
      <div v-html="compiledMarkdown" class="preview"></div>
    </div>
  </form>
</template>
<script>
import { richmd } from 'richmd'

export default {
  data() {
    return {
      markdownText: ''
    }
  },
  computed: {
    compiledMarkdown () {
      return richmd(this.markdownText)
    }
  },
}
</script>
```

## Markdown Syntax
Please read a [Richmd Markdown Syntax Documentation](./docs/md-syntax.md).

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

### Will be released support syntax in the future 
- Code block syntax highlight
- Color Inline Block
- Using CSS framework [UIkit](https://getuikit.com/)
