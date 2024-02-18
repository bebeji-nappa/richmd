import Katex from "katex";
import { changeHtml } from "./changeHtml";

export const blockquote = (values: Convert[][]) => {
  let bq = '<blockquote class="blockquote">\n';
  for (const key in values) {
    let text = '<span class="span">';
    const data: Convert[] = values[key];
    for (const val in data) {
      switch (data[val].name) {
        case "em":
          text += `<strong>${data[val].value}</strong>`;
          break;
        case "strikethrough":
          text += `<del>${data[val].value}</del>`;
          break;
        case "italic":
          text += `<em>${data[val].value}</em>`;
          break;
        case "emitalic":
          text += `<em><strong>${data[val].value}</strong></em>`;
          break;
        case "link": {
          const path = changeHtml(data[val].href);
          text += `<a href="${path}" class="a">${data[val].title}</a>`;
          break;
        }
        case "image":
          text += `<img src="${data[val].src}" alt="${data[val].alt}" />`;
          break;
        case "video":
          text += `<video controls preload="none" class="video">\n<source src="${data[val].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
          break;
        case "code":
          text += `<code class="inline-code">${data[val].value}</code>`;
          break;
        case "katex": {
          const html = Katex.renderToString(String.raw`\displaystyle ${data[val].value}`, {
            throwOnError: false,
          });
          text += html;
          break;
        }
        default: {
          if (data[val].value === "\n") {
            text += "<br>";
          } else {
            text += data[val].value.replace(/\n/g, "<br>");
          }
          break;
        }
      }
    }
    text += "</span>\n";
    bq += text;
  }
  bq += "</blockquote>\n";
  return bq;
};
