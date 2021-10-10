const Katex = require("katex");
const hljs = require("highlight.js");
import "../type"

export const heading = (level: number, values: Convert[]) => {
  // return `<h${level} class="h${level}">${value}</h${level}>\n`;
  let text = `<h${level} class="h${level}">\n`;
  for (const key in values) {
    if (values[key].name === "em") {
      text += `<strong>${values[key].value}</strong>`;
    } else if (values[key].name === "strikethrough") {
      text += `<del>${values[key].value}</del>`;
    } else if (values[key].name === "italic") {
      text += `<em>${values[key].value}</em>`;
    } else if (values[key].name === "emitalic") {
      text += `<em><strong>${values[key].value}</strong></em>`;
    } else if (values[key].name === "link") {
      const path = changeHtml(values[key].href);
      text += `<a href="${path}" class="a">${values[key].title}</a>`;
    } else if (values[key].name === "image") {
      text += `<img src="${values[key].src}" alt="${values[key].alt}" class="img" />`;
    } else if (values[key].name === "video") {
      text += `<video controls preload="none" class="video">\n<source src="${values[key].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
    } else if (values[key].name === "code") {
      text += `<code class="inline-code">${values[key].value}</code>`;
    } else if (values[key].name === "katex") {
      const html = Katex.renderToString(String.raw`\textstyle ${values[key].value}`, {
        throwOnError: false,
      });
      text += html;
    } else {
      text += values[key].value;
    }
  }
  text += `</h${level}>\n`;
  return text;
};

export const paragraph = (values: Convert[]) => {
  let text = `<p class="p">\n`;
  for (const key in values) {
    if (values[key].name === "em") {
      text += `<strong>${values[key].value}</strong>`;
    } else if (values[key].name === "strikethrough") {
      text += `<del>${values[key].value}</del>`;
    } else if (values[key].name === "italic") {
      text += `<em>${values[key].value}</em>`;
    } else if (values[key].name === "emitalic") {
      text += `<em><strong>${values[key].value}</strong></em>`;
    } else if (values[key].name === "link") {
      const path = changeHtml(values[key].href);
      text += `<a href="${path}" class="a">${values[key].title}</a>`;
    } else if (values[key].name === "image") {
      text += `<img src="${values[key].src}" alt="${values[key].alt}" class="img" />`;
    } else if (values[key].name === "video") {
      text += `<video controls preload="none" class="video">\n<source src="${values[key].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
    } else if (values[key].name === "code") {
      text += `<code class="inline-code">${values[key].value}</code>`;
    } else if (values[key].name === "katex") {
      const html = Katex.renderToString(String.raw`\textstyle ${values[key].value}`, {
        throwOnError: false,
      });
      text += html;
    } else {
      text += values[key].value;
    }
  }
  text += `</p>\n`;
  return text;
};

export const blockquote = (values: Convert[][]) => {
  let bq = `<blockquote class="blockquote">\n`;
  for (const key in values) {
    let text = `<p class="p">\n`;
    const data: Convert[] = values[key];
    for (const val in data) {
      if (data[val].name === "em") {
        text += `<strong>${data[val].value}</strong>`;
      } else if (data[val].name === "strikethrough") {
        text += `<del>${data[val].value}</del>`;
      } else if (data[val].name === "italic") {
        text += `<em>${data[val].value}</em>`;
      } else if (data[val].name === "emitalic") {
        text += `<em><strong>${data[val].value}</strong></em>`;
      } else if (data[val].name === "link") {
        const path = changeHtml(data[val].href);
        text += `<a href="${path}" class="a">${data[val].title}</a>`;
      } else if (data[val].name === "image") {
        text += `<img src="${data[val].src}" alt="${data[val].alt}" />`;
      } else if (data[val].name === "code") {
        text += `<code class="inline-code">${data[val].value}</code>`;
      } else {
        text += data[val].value;
      }
    }
    text += `</p>\n`;
    bq += text;
  }
  bq += `</blockquote>\n`;
  return bq;
};

export const ulist = (values: List[]) => {
  let prev: List | null = null;
  let ulist = `<ul class="ul">\n`;
  for (const key in values) {
    if (prev && values[key].level > prev.level) {
      ulist += `<ul class="ul">\n`;
      ulist += `<li class="li">\n`;
      ulist += `${values[key].values[0].value}\n`;
      ulist += `</li>\n`;
    } else if (prev && values[key].level < prev.level) {
      for (let i = 0; i < prev.level - values[key].level; i++) {
        ulist += `</ul>\n`;
      }
      ulist += `<li class="li">\n`;
      ulist += `${values[key].values[0].value}\n`;
      ulist += `</li>\n`;
    } else if (prev && values[key].level === prev.level) {
      ulist += `<li class="li">\n`;
      ulist += `${values[key].values[0].value}\n`;
      ulist += `</li>\n`;
    } else {
      ulist += `<li class="li">\n`;
      ulist += `${values[key].values[0].value}\n`;
      ulist += `</li>\n`;
    }
    prev = values[key];
  }
  ulist += `</ul>\n`;
  return ulist;
};

export const checklist = (values: List[]) => {
  let prev: List | null = null;
  let clist = `<ul class="ul checklist">\n`;
  for (const key in values) {
    if (prev && values[key].level > prev.level) {
      clist += `<ul class="ul">\n`;
      clist += `<li class="li checklist">\n`;
      if (values[key].checked) {
        clist += `<input type="checkbox" checked="checked">${values[key].values[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${values[key].values[0].value}\n`;
      }
      clist += `</li>\n`;
    } else if (prev && values[key].level < prev.level) {
      for (let i = 0; i < prev.level - values[key].level; i++) {
        clist += `</ul>\n`;
      }
      clist += `<li class="li checklist">\n`;
      if (values[key].checked) {
        clist += `<input type="checkbox" checked="checked">${values[key].values[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${values[key].values[0].value}\n`;
      }
      clist += `</li>\n`;
    } else if (prev && values[key].level === prev.level) {
      clist += `<li class="li checklist">\n`;
      if (values[key].checked) {
        clist += `<input type="checkbox" checked="checked">${values[key].values[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${values[key].values[0].value}\n`;
      }
      clist += `</li>\n`;
    } else {
      clist += `<li class="li checklist">\n`;
      if (values[key].checked) {
        clist += `<input type="checkbox" checked="checked">${values[key].values[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${values[key].values[0].value}\n`;
      }
      clist += `</li>\n`;
    }
    prev = values[key];
  }
  clist += `</ul>\n`;
  return clist;
};

export const orderedlist = (values: Convert[][]) => {
  let olist = `<ol class="ol">\n`;
  for (const key in values) {
    const data = values[key]
    for (const key in data) {
      olist += `<li class="li">${data[key].value}</li>\n`;
    }
  }
  olist += `</ol>\n`;
  return olist;
};

export const code = (data: OptionalConvert) => {
  let codeblock = `<pre class="code">\n`;
  if (data.file !== undefined) {
    codeblock += `<span class="filename">${data.file}</span>\n`;
  }
  if (!data.syntax) {
    codeblock += `<code class="codefont txt">\n${data.values[0].value}\n</code>\n`;
  } else if (data.syntax === "txt") {
    codeblock += `<code class="codefont txt">\n${data.values[0].value}\n</code>\n`;
  } else {
    codeblock += `<code class="codefont ${data.syntax}">\n${
      hljs.highlightAuto(`${data.values[0].value}`).value
    }\n</code>\n`;
  }
  codeblock += `</pre>\n`;
  return codeblock;
};

export const katex = (data: OptionalConvert) => {
  const html = Katex.renderToString(String.raw`\displaystyle${data.values[0].value}`, {
    throwOnError: false,
  });
  return `<pre class="math katex-center">\n${html}\n</pre>\n`;
};

export const horizontal = () => {
  return `<hr />\n`;
};

export const table = (data: Convert) => {
  let tableblock = `<table class="table">\n`;
  tableblock += `<thead>\n<tr>\n`;
  for (const heading of data.headings) {
    tableblock += `<th>${heading}</th>\n`;
  }
  tableblock += `</thead>\n</tr>\n`;
  tableblock += `<tbody>\n`;
  for (const row of data.rows) {
    tableblock += `<tr>\n`;
    for (const column of row) {
      for (const key in column) {
        tableblock += `<td>${column[key].value}</td>\n`;
      }
    }
    tableblock += `</tr>\n`;
  }
  tableblock += `</tbody>\n`;
  tableblock += `</table>\n`;
  return tableblock;
};

export const br = () => {
  return `<br class="br" />\n`;
};

export const colorBlock = (datas: Convert) => {
  let text = `<pre class="message message-${datas.style}">\n`;
  const data = datas.values;
  for (const key in data) {
    if (data[key].name === "em") {
      text += `<strong>${data[key].value}</strong>`;
    } else if (data[key].name === "strikethrough") {
      text += `<del>${data[key].value}</del>`;
    } else if (data[key].name === "italic") {
      text += `<em>${data[key].value}</em>`;
    } else if (data[key].name === "emitalic") {
      text += `<em><strong>${data[key].value}</strong></em>`;
    } else if (data[key].name === "link") {
      const path = changeHtml(data[key].href);
      text += `<a href="${path}" class="a">${data[key].title}</a>`;
    } else if (data[key].name === "image") {
      text += `<img src="${data[key].src}" alt="${data[key].alt}" />`;
    } else if (data[key].name === "code") {
      text += `<code class="inline-code">${data[key].value}</code>`;
    } else {
      text += data[key].value;
    }
  }
  text += `</pre>\n`;
  return text;
};

export const Import = (data: string) => {
  return `<link rel="stylesheet" href="${data}">\n`;
};

export const startDetails = (data: string) => {
  return `<details><summary>${data}</summary>\n`;
};

export const endDetails = () => {
  return `</details>\n`;
};

export const startTag = (data: Convert) => {
  const tags = ["div", "menu", "main", "section", "article", "header", "aside", "nav", "footer"];

  if (!data.tag) {
    if (!data.style) {
      return `<div>\n`;
    } else {
      return `<div class="${data.style}">\n`;
    }
  } else {
    if (tags.includes(data.tag)) {
      if (!data.style) {
        return `<${data.tag}>\n`;
      } else {
        return `<${data.tag} class="${data.style}">\n`;
      }
    } else {
      return `<div>\n`;
    }
  }
};

export const endTag = (data: Convert) => {
  const tags = ["div", "menu", "main", "section", "article", "header", "aside", "nav", "footer"];

  if (!data.tag) {
    return `</div>\n`;
  }
  if (tags.includes(data.tag)) {
    return `</${data.tag}>\n`;
  } else {
    return `</div>\n`;
  }
};

//リンク先の拡張子が .richmd の場合は .html に変換する
const changeHtml = (path: string) => {
  const url = path.trim().split(`\/`);
  let dirpath = url.slice(0, -1).join(`\/`);
  if (!dirpath) {
    dirpath = `\.`;
  }
  const file = url[url.length - 1].split(`\.`);
  if (file[1] === "richmd") {
    file[1] = "html"
    const newfile = file.join(`\.`);
    return [dirpath, newfile].join(`\/`);
  } else {
    return path;
  }
}
