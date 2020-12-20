import { mdConvert } from '../src/index.js'

describe('heading convert', () => {
  it('heading1', () => {
    const text = `# heading 1`
    const convertedResult = `<h1>heading 1</h1>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('heading2', () => {
    const text = `## heading 2`
    const convertedResult = `<h2>heading 2</h2>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('heading3', () => {
    const text = `### heading 3`
    const convertedResult = `<h3>heading 3</h3>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('heading4', () => {
    const text = `#### heading 4`
    const convertedResult = `<h4>heading 4</h4>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('heading5', () => {
    const text = `##### heading 5`
    const convertedResult = `<h5>heading 5</h5>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('heading6', () => {
    const text = `###### heading 6`
    const convertedResult = `<h6>heading 6</h6>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })
})

describe('paragraph convert', () => {
  it('p', () => {
    const text = `text test`
    const convertedResult = `<p>text test</p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('strong', () => {
    const text = `**text**`
    const convertedResult = `<p><strong>text</strong></p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('strong (underline syntax)', () => {
    const text = `__text__`
    const convertedResult = `<p><strong>text</strong></p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('del', () => {
    const text = `~~text~~`
    const convertedResult = `<p><del>text</del></p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('em', () => {
    const text = `*text*`
    const convertedResult = `<p><em>text</em></p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('em (underline syntax)', () => {
    const text = `_text_`
    const convertedResult = `<p><em>text</em></p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('link', () => {
    const text = `[text](http://localhost)`
    const convertedResult = `<p><a href="http://localhost">text</a></p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('image', () => {
    const text = `![text](image.jpg)`
    const convertedResult = `<p><img src="image.jpg" alt="text" /></p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('inline code', () => {
    const text = `\`code\``
    const convertedResult = `<p><code>code</code></p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })
})

describe('blockquote', () => {
  it('case 1', () => {
    const text = `> text`
    const convertedResult = `<blockquote><p>text</p></blockquote>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('case 2', () => {
    const text = `> text\ntext`
    const convertedResult = `<blockquote><p>text</p><p>text</p></blockquote>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('case 3', () => {
    const text = `> text\ntext\n\ntext`
    const convertedResult = `<blockquote><p>text</p><p>text</p></blockquote><p>text</p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('case 4', () => {
    const text = `> text\n> \ntext\n\ntext`
    const convertedResult = `<blockquote><p>text</p><p></p><p>text</p></blockquote><p>text</p>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })
})

describe('list', () => {
  it('case 1', () => {
    const text = `- list1\n- list2\n- list3\n`
    const convertedResult = `<ul><li>list1</li><li>list2</li><li>list3</li></ul>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('case 2', () => {
    const text = `- list1\n  - list2\n- list3\n`
    const convertedResult = `<ul><li>list1</li><ul><li>list2</li></ul><li>list3</li></ul>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('case 3', () => {
    const text = `- list1\n  - list2\n  - list2\n- list3\n`
    const convertedResult = `<ul><li>list1</li><ul><li>list2</li><li>list2</li></ul><li>list3</li></ul>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('case 4', () => {
    const text = `- list1\n  - list2\n  - list2\n      - list3\n- list4`
    const convertedResult = `<ul><li>list1</li><ul><li>list2</li><li>list2</li><ul><li>list3</li></ul></ul><li>list4</li></ul>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })
})

describe('checklist', () => {
  it('checked checkbox', () => {
    const text = `- [x] list1`
    const convertedResult = `<ul><li><input type="checkbox" checked="checked">list1</li></ul>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })  
  it('case 1', () => {
    const text = `- [ ] list1\n- [ ] list2\n`
    const convertedResult = `<ul><li><input type="checkbox">list1</li><li><input type="checkbox">list2</li></ul>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('case 2', () => {
    const text = `- [ ] list1\n  - [ ] list2\n- [ ] list3\n`
    const convertedResult = `<ul><li><input type="checkbox">list1</li><ul><li><input type="checkbox">list2</li></ul><li><input type="checkbox">list3</li></ul>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })
})

it('orderedlist', () => {
  const text = `1. list1\n2. list2\n  3. list3`
  const convertedResult = `<ol><li>list1</li><li>list2</li><li>list3</li></ol>`
  const result = mdConvert(text).replace(/\n/g, '')
  expect(result).toEqual(convertedResult)
})

const codeblockData = `\`\`\`
code block
\`\`\`
`

it('code block', () => {
  const convertedResult = `<pre><code class="">code block</code></pre>`
  const result = mdConvert(codeblockData).replace(/\n/g, '')
  expect(result).toEqual(convertedResult)
})

describe('horizontal', () => {
  it('---', () => {
    const text = `---`
    const convertedResult = `<hr />`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('***', () => {
    const text = `***`
    const convertedResult = `<hr />`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })
})

describe('br', () => {
  it('once break line', () => {
    const text = `\n`
    const convertedResult = `<br />`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })

  it('continuous break line', () => {
    const text = `\n\n\n`
    const convertedResult = `<br />`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })
})

const text = `|  TH1  |  TH2  |
| ---- | ---- |
|  TD1  |  TD2  |
`

describe('table', () => {
  it('create table', () => {
    const convertedResult = `<table><thead><tr><th>TH1</th><th>TH2</th></thead></tr><tbody><tr><td>TD1</td><td>TD2</td></tr></tbody></table>`
    const result = mdConvert(text).replace(/\n/g, '')
    expect(result).toEqual(convertedResult)
  })
})


