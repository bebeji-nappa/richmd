const Katex = require("katex");
import "../type";
import { changeHtml } from "./changeHtml";

import { heading } from "./heading";
import { paragraph } from "./paragraph";
import { blockquote } from "./blockquote";
import { ulist } from "./ulist";
import { checklist } from "./checklist";
import { olist } from "./olist";
import { code } from "./code";
import { katex } from "./katex";
import { horizontal } from "./horizontal";

export {
  heading,
  paragraph,
  blockquote,
  ulist,
  checklist,
  olist,
  code,
  katex,
  horizontal,
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
      tableblock += `<td>`;
      for (const key in column) {
        if (column[key].name === "em") {
          tableblock += `<strong>${column[key].value}</strong>`;
        } else if (column[key].name === "strikethrough") {
          tableblock += `<del>${column[key].value}</del>`;
        } else if (column[key].name === "italic") {
          tableblock += `<em>${column[key].value}</em>`;
        } else if (column[key].name === "emitalic") {
          tableblock += `<em><strong>${column[key].value}</strong></em>`;
        } else if (column[key].name === "link") {
          const path = changeHtml(column[key].href);
          tableblock += `<a href="${path}" class="a">${column[key].title}</a>`;
        } else if (column[key].name === "image") {
          tableblock += `<img src="${column[key].src}" alt="${column[key].alt}" class="img" />`;
        } else if (column[key].name === "video") {
          tableblock += `<video controls preload="none" class="video">\n<source src="${column[key].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        } else if (column[key].name === "code") {
          tableblock += `<code class="inline-code">${column[key].value}</code>`;
        } else if (column[key].name === "katex") {
          const html = Katex.renderToString(String.raw`\displaystyle ${column[key].value}`, {
            throwOnError: false,
          });
          tableblock += html;
        } else {
          tableblock += column[key].value;
        }
      }
      tableblock += `</td>\n`;
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
  let text = `<div class="message message-${datas.style}"><div class="message-icon-${datas.style}"></div>`;
  text += `<pre class="message-box">`;
  const data = datas.values;
  text += `<span>`;
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
      if (data[key].value === "\n") {
        text += `<br>`;
      } else {
        text += data[key].value.replace(/\n/g, `\n`);
      }
    }
  }
  text += `</span>`;
  text += `</pre></div>\n`;
  return text;
};

export const Import = (data: string) => {
  return `<link rel="stylesheet" href="${data}">\n`;
};

export const startDetails = (data: string) => {
  return `<details class="details"><summary class="summary">${data}</summary>\n`;
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
