import Katex from "katex";
import { changeHtml } from "./changeHtml";


export const olist = (values: List[]) => {
  let prev: List | null = null;
  const type = (level: number) => {
    if (level === 1) {
      return "1";
    } else if (level % 2 === 0) {
      return "i";
    } else if (level % 3 === 0) {
      return "a";
    } else {
      return "1";
    }
  };
  let olist = `<ol class="ol" type="1">\n`;
  for (const key in values) {
    if (prev && values[key].level > prev.level) {
      olist += `<ol class="ol" type="${type(values[key].level)}">\n`;
    } else if (prev && values[key].level < prev.level) {
      for (let i = 0; i < prev.level - values[key].level; i++) {
        olist += `</ol>\n`;
      }
    }
    olist += `<li class="li">\n`;
    for (const i in values[key].values) {
      switch (values[key].values[i].name) {
        case "em":
          olist += `<strong>${values[key].values[i].value}</strong>`;
          break;
        case "strikethrough":
          olist += `<del>${values[key].values[i].value}</del>`;
          break;
        case "italic":
          olist += `<em>${values[key].values[i].value}</em>`;
          break;
        case "emitalic":
          olist += `<em><strong>${values[key].values[i].value}</strong></em>`;
          break;
        case "link":
          const path = changeHtml(values[key].values[i].href);
          olist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
          break;
        case "image":
          olist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
          break;
        case "video":
          olist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
          break;
        case "code":
          olist += `<code class="inline-code">${values[key].values[i].value}</code>`;
          break;
        case "katex":
          const html = Katex.renderToString(String.raw`\displaystyle ${values[key].values[i].value}`, {
            throwOnError: false,
          });
          olist += html;
          break;
        default:
          if (values[key].values[i].value === "\n") {
            olist += `<br>`;
          } else {
            olist += values[key].values[i].value;
          }
          break;
      }
    }
    olist += `</li>\n`;
    prev = values[key];
  }
  olist += `</ol>\n`;
  return olist;
};
