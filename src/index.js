import mtp from 'markdown-tree-parser'

const text = `
# Heading 1
## Heading 2
test **Markdown**
`
const tree = mtp(text);
console.log(tree.dump());
