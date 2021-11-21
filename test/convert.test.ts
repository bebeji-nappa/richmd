import { richmd } from "../src/index";

describe("heading convert", () => {
  it("heading1", () => {
    const text = `# heading 1`;
    const convertedResult = `<h1 class="h1">heading 1</h1>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("heading2", () => {
    const text = `## heading 2`;
    const convertedResult = `<h2 class="h2">heading 2</h2>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("heading3", () => {
    const text = `### heading 3`;
    const convertedResult = `<h3 class="h3">heading 3</h3>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("heading4", () => {
    const text = `#### heading 4`;
    const convertedResult = `<h4 class="h4">heading 4</h4>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("heading5", () => {
    const text = `##### heading 5`;
    const convertedResult = `<h5 class="h5">heading 5</h5>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("heading6", () => {
    const text = `###### heading 6`;
    const convertedResult = `<h6 class="h6">heading 6</h6>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("heading1 inline link", () => {
    const text = `# [Link](http://example.com)`;
    const convertedResult = `<h1 class="h1"><a href="http://example.com" class="a">Link</a></h1>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

});

describe("paragraph convert", () => {
  it("p", () => {
    const text = `text test`;
    const convertedResult = `<p class="p">text test</p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("strong", () => {
    const text = `**text**`;
    const convertedResult = `<p class="p"><strong>text</strong></p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("strong (underline syntax)", () => {
    const text = `__text__`;
    const convertedResult = `<p class="p"><strong>text</strong></p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("del", () => {
    const text = `~~text~~`;
    const convertedResult = `<p class="p"><del>text</del></p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("em", () => {
    const text = `*text*`;
    const convertedResult = `<p class="p"><em>text</em></p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("em (underline syntax)", () => {
    const text = `_text_`;
    const convertedResult = `<p class="p"><em>text</em></p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("link", () => {
    const text = `[text](http://localhost)`;
    const convertedResult = `<p class="p"><a href="http://localhost" class="a">text</a></p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("image", () => {
    const text = `![text](image.jpg)`;
    const convertedResult = `<p class="p"><img src="image.jpg" alt="text" class="img" /></p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("inline code", () => {
    const text = `\`code\``;
    const convertedResult = `<p class="p"><code class="inline-code">code</code></p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });
});

describe("blockquote", () => {
  it("case 1", () => {
    const text = `> text`;
    const convertedResult = `<blockquote class="blockquote"><p class="p">text</p></blockquote>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("case 2", () => {
    const text = `> text\ntext`;
    const convertedResult = `<blockquote class="blockquote"><p class="p">text</p><p class="p">text</p></blockquote>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("case 3", () => {
    const text = `> text\ntext\n\ntext`;
    const convertedResult = `<blockquote class="blockquote"><p class="p">text</p><p class="p">text</p></blockquote><p class="p">text</p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("case 4", () => {
    const text = `> text\n> \ntext\n\ntext`;
    const convertedResult = `<blockquote class="blockquote"><p class="p">text</p><p class="p"></p><p class="p">text</p></blockquote><p class="p">text</p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("case 5", () => {
    const text = `> text\n\ntext`;
    const convertedResult = `<blockquote class="blockquote"><p class="p">text</p></blockquote><p class="p">text</p>`;
    const result = richmd(text).replace(/\n/g, "");
    console.log(result)
    expect(result).toEqual(convertedResult);
  });
});

describe("list", () => {
  it("case 1", () => {
    const text = `- list1\n- list2\n- list3\n`;
    const convertedResult = `<ul class="ul"><li class="li">list1</li><li class="li">list2</li><li class="li">list3</li></ul>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("case 2", () => {
    const text = `- list1\n  - list2\n- list3\n`;
    const convertedResult = `<ul class="ul"><li class="li">list1</li><ul class="ul"><li class="li">list2</li></ul><li class="li">list3</li></ul>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("case 3", () => {
    const text = `- list1\n  - list2\n  - list2\n- list3\n`;
    const convertedResult = `<ul class="ul"><li class="li">list1</li><ul class="ul"><li class="li">list2</li><li class="li">list2</li></ul><li class="li">list3</li></ul>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("case 4", () => {
    const text = `- list1\n  - list2\n  - list2\n      - list3\n- list4`;
    const convertedResult = `<ul class="ul"><li class="li">list1</li><ul class="ul"><li class="li">list2</li><li class="li">list2</li><ul class="ul"><li class="li">list3</li></ul></ul><li class="li">list4</li></ul>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("inline link", () => {
    const text = `- [list1](http://example.com)\n`;
    const convertedResult = `<ul class="ul"><li class="li"><a href="http://example.com" class="a">list1</a></li></ul>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });
});

describe("checklist", () => {
  it("checked checkbox", () => {
    const text = `- [x] list1`;
    const convertedResult = `<ul class="ul checklist"><li class="li checklist"><input type="checkbox" checked="checked">list1</li></ul>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });
  it("case 1", () => {
    const text = `- [ ] list1\n- [ ] list2\n`;
    const convertedResult = `<ul class="ul checklist"><li class="li checklist"><input type="checkbox">list1</li><li class="li checklist"><input type="checkbox">list2</li></ul>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("case 2", () => {
    const text = `- [ ] list1\n  - [ ] list2\n- [ ] list3\n`;
    const convertedResult = `<ul class="ul checklist"><li class="li checklist"><input type="checkbox">list1</li><ul class="ul"><li class="li checklist"><input type="checkbox">list2</li></ul><li class="li checklist"><input type="checkbox">list3</li></ul>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });
});

it("orderedlist", () => {
  const text = `1. list1\n2. list2\n  3. list3`;
  const convertedResult = `<ol class="ol"><li class="li">list1</li><li class="li">list2</li><li class="li">list3</li></ol>`;
  const result = richmd(text).replace(/\n/g, "");
  expect(result).toEqual(convertedResult);
});

const codeblockData = `\`\`\`
code block
\`\`\`
`;

const codeblockTxt = `\`\`\`txt
const hello = "Hello world"
console.log(hello)
\`\`\`
`;

const codeblockJs = `\`\`\`js
const hello = "Hello world"
console.log(hello)
\`\`\`
`;

const codeblockBr = `\`\`\`js
const hello = "Hello world"

console.log(hello)
\`\`\`
`;

const convertedResultBr = `<pre class="code-block">
<div class="code"><code class="codefont language-js">
<span class=\"hljs-keyword\">const</span> hello = <span class=\"hljs-string\">&quot;Hello world&quot;</span>
<br />
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(hello)
</code></div>
</pre>
`;

describe("codeblock", () => {
  it("Not language & Not filename", () => {
    const convertedResult = `<pre class="code-block"><div class="code"><code class="codefont txt">code block</code></div></pre>`;
    const result = richmd(codeblockData).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("language txt & Not filename", () => {
    const convertedResult = `<pre class="code-block"><div class="code"><code class="codefont txt">const hello = "Hello world"console.log(hello)</code></div></pre>`;
    const result = richmd(codeblockTxt).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("language js & Not filename", () => {
    const convertedResult = `<pre class="code-block"><div class="code"><code class="codefont language-js"><span class=\"hljs-keyword\">const</span> hello = <span class=\"hljs-string\">&quot;Hello world&quot;</span><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(hello)</code></div></pre>`;
    const result = richmd(codeblockJs).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("pre-line", () => {
    const result = richmd(codeblockBr);
    expect(result).toEqual(convertedResultBr);
  });
});

describe("horizontal", () => {
  it("---", () => {
    const text = `---`;
    const convertedResult = `<hr />`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("***", () => {
    const text = `***`;
    const convertedResult = `<hr />`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });
});

describe("br", () => {
  it("once break line", () => {
    const text = `# h1\n\ntest`;
    const convertedResult = `<h1 class="h1">h1</h1><p class="p">test</p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("continuous break line", () => {
    const text = `test\n\ntest`;
    const convertedResult = `<p class="p">test<br></p><br class="br" /><p class="p">test</p>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });
});

const text = `|  TH1  |  TH2  |
| ---- | ---- |
|  TD1  |  TD2  |
`;

const text2 = `|  TH1  |  TH2  |
| ---- | ---- |
|  **TD1**  |  *TD2*  |
`;

describe("table", () => {
  it("create table", () => {
    const convertedResult = `<table class="table"><thead><tr><th>TH1</th><th>TH2</th></thead></tr><tbody><tr><td>TD1</td><td>TD2</td></tr></tbody></table>`;
    const result = richmd(text).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });

  it("inline column", () => {
    const convertedResult = `<table class="table"><thead><tr><th>TH1</th><th>TH2</th></thead></tr><tbody><tr><td><strong>TD1</strong></td><td><em>TD2</em></td></tr></tbody></table>`;
    const result = richmd(text2).replace(/\n/g, "");
    expect(result).toEqual(convertedResult);
  });
});

test("video", () => {
  const text = `@[video](./hoge.mp4)`;
  const convertedResult = `<p class="p"><video controls preload="none" class="video"><source src="./hoge.mp4" />Sorry, your browser doesn't support embedded videos.</video></p>`;
  const result = richmd(text).replace(/\n/g, "");
  expect(result).toEqual(convertedResult);
})

const default_block = `===
test
===`;

const info_block = `===info
test
===`;

const success_block = `===success
test
===`;
const warning_block = `===warning
test
===`;

const danger_block = `===danger
test
===`;

describe("colorBlock", () => {
  it("default", () => {
    const result = richmd(default_block);
    const convertResult = `<div class="message message-default"><div class="message-icon-default"></div><pre class="message-box"><span>test</span></pre></div>\n`;
    expect(result).toEqual(convertResult);
  })

  it("info", () => {
    const result = richmd(info_block);
    const convertResult = `<div class="message message-info"><div class="message-icon-info"></div><pre class="message-box"><span>test</span></pre></div>\n`;
    expect(result).toEqual(convertResult);
  })

  it("success", () => {
    const result = richmd(success_block);
    const convertResult = `<div class="message message-success"><div class="message-icon-success"></div><pre class="message-box"><span>test</span></pre></div>\n`;
    expect(result).toEqual(convertResult);
  })

  it("warning", () => {
    const result = richmd(warning_block);
    const convertResult = `<div class="message message-warning"><div class="message-icon-warning"></div><pre class="message-box"><span>test</span></pre></div>\n`;
    expect(result).toEqual(convertResult);
  })

  it("danger", () => {
    const result = richmd(danger_block);
    const convertResult = `<div class="message message-danger"><div class="message-icon-danger"></div><pre class="message-box"><span>test</span></pre></div>\n`;
    expect(result).toEqual(convertResult);
  })
})
