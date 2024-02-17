import Katex from "katex";
import { changeHtml } from "./changeHtml";

export const heading = (level: number, values: Convert[]) => {
  let text = `<h${level} class="h${level}">\n`;
  for (const key in values) {
    switch (values[key].name) {
      case  "em":
        text += `<strong>${values[key].value}</strong>`;
        break;
      case "strikethrough":
        text += `<del>${values[key].value}</del>`;
        break;
      case "italic":
        text += `<em>${values[key].value}</em>`;
        break;
      case "emitalic":
        text += `<em><strong>${values[key].value}</strong></em>`;
        break;
      case "link":
        const path = changeHtml(values[key].href);
        text += `<a href="${path}" class="a">${values[key].title}</a>`;
        break;
      case "image":
        text += `<img src="${values[key].src}" alt="${values[key].alt}" class="img" />`;
        break;
      case "video":
        text += `<video controls preload="none" class="video">\n<source src="${values[key].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        break;
      case "code":
        text += `<code class="inline-code">${values[key].value}</code>`;
        break;
      case "katex":
        const html = Katex.renderToString(String.raw`\displaystyle ${values[key].value}`, {
          throwOnError: false,
        });
        text += html;
        break;
      default:
        text += values[key].value;
        break;
    }
  }
  text += `</h${level}>\n`;
  return text;
};
