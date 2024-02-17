import Katex from "katex";
import { changeHtml } from "./changeHtml";

export const ulist = (values: List[]) => {
  let prev: List | null = null;
  let ulist = `<ul class="ul">\n`;
  for (const key in values) {
    if (prev && values[key].level > prev.level) {
      ulist += `<ul class="ul">\n`;
    } else if (prev && values[key].level < prev.level) {
      for (let i = 0; i < prev.level - values[key].level; i++) {
        ulist += `</ul>\n`;
      }
    }
    ulist += `<li class="li">`;
    for (const i in values[key].values) {
      switch (values[key].values[i].name) {
        case "em":
          ulist += `<strong>${values[key].values[i].value}</strong>`;
          break;
        case "strikethrough":
          ulist += `<del>${values[key].values[i].value}</del>`;
          break;
        case "italic":
          ulist += `<em>${values[key].values[i].value}</em>`;
          break;
        case "emitalic":
          ulist += `<em><strong>${values[key].values[i].value}</strong></em>`;
          break;
        case "link":
          const path = changeHtml(values[key].values[i].href);
          ulist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
          break;
        case "image":
          ulist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
          break;
        case "video":
          ulist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
          break;
        case "code":
          ulist += `<code class="inline-code">${values[key].values[i].value}</code>`;
          break;
        case "katex":
          const html = Katex.renderToString(String.raw`\displaystyle ${values[key].values[i].value}`, {
            throwOnError: false,
          });
          ulist += html;
          break;
        default:
          if (values[key].values[i].value === "\n") {
            ulist += `<br>`;
          } else {
            ulist += values[key].values[i].value;
          }
          break;
      }
    }
    ulist += `</li>\n`;
    prev = values[key];
  }
  ulist += `</ul>\n`;
  return ulist;
};
