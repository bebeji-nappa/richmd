import mtp from '@/parse/index.js'

const text = `
# Heading 1
## Heading 2
test **Markdown**

- [ ] checklist1
  - [ ] checklist-child
- [ ] checklist2
- [ ] checklist3

- list
  - list2
- list3

1. aaa
  2. bbb
3. ccc

[hoge](http://localhost)
`
const tree = mtp(text);
console.log(tree);
console.log(JSON.stringify(tree, null, '  '));
