# Usage RichMD for Vue(v2)
It is usage example RichMD by Vue. 

This code add to Vue SFC.

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
import { richmd } from 'richmd' // import Richmd

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

