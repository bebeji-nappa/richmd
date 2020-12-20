import { mdConvert } from './index.js'
import mtp from '@/parse/index.js'
const text = `# Heading 1
## Heading 2
test **Markdown** ~~hoge~~ *hoge*
test hogehoge hoge

> blockquote **test**
test

- [x] list
  - [x] list2
  - [ ] list2
    - [ ] list3
- [ ] list4

- list
  - list2
  - list2
    - list3
- list4

1. aaa
  2. bbb
3. ccc

\`code inline\`

\`\`\`js
code ....
\`\`\`

---

|  TH1  |  TH2  |
| ---- | ---- |
|  TD1  |  TD2  |
|  TD1  |  TD2  |


[hoge](http://localhost)
`
const htmlStr = mdConvert(text)
console.log(htmlStr);
// console.log(JSON.stringify(mtp(text), null, '  '));
