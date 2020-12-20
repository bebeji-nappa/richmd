# Md Converter
This tool make Markdown syntax convert to HTML syntax.

## Installation

```bash
# use npm
npm install md-converter

# use yarn
yarn add md-converter
```

## Usage
### ES Module
You can use Md Converter as a ECMAScript module.

```js
import { mdConvert } from 'md-converter'

const md = `# heading 1`
mdConvert(md) // Markdown convert to HTML
```

### Vue.js
#### Import
Please be sure to import the css file.

```js
// import Stylesheet
import 'md-converter/src/styles/index.css'
```

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
import { mdConvert } from 'md-converter'

export default {
  data() {
    return {
      markdownText: ''
    }
  },
  computed: {
    compiledMarkdown () {
      return mdConvert(this.markdownText)
    }
  },
}
</script>
```

