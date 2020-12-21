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
### ES Module
You can use Md Converter as a ECMAScript module.

```js
import { richmd } from 'richmd'

const md = `# heading 1`
richmd(md) // Markdown convert to HTML
```

### Vue.js
#### Simple example usage

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

## Suport syntax
- strong
- italic
- image
- link
- headings
- horizontal rule
- blockquote
- unordeed list
- ordeed list
- strikethrough
- code block
- checkbox list
- table

## Will be released support syntax in the future 
- Code block syntax highlight
- LaTeX syntax
- Color Inline Block
- Using CSS framework [UIkit](https://getuikit.com/)
