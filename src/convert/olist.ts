import * as Katex from "katex";
import { changeHtml } from "./changeHtml";

export const olist = (values: List[]) => {
  let prev: List | null = null;
  const type = (level: number) => {
    if (level === 1) {
      return "1";
    }
    if (level % 2 === 0) {
      return "i";
    }
    if (level % 3 === 0) {
      return "a";
    }
    return "1";
  };
  let orderList = '<ol class="ol" type="1">\n';
  for (const key in values) {
    if (prev && values[key].level > prev.level) {
      orderList += `<ol class="ol" type="${type(values[key].level)}">\n`;
    } else if (prev && values[key].level < prev.level) {
      for (let i = 0; i < prev.level - values[key].level; i += 1) {
        orderList += "</ol>\n";
      }
    }
    orderList += '<li class="li">';
    for (const i in values[key].values) {
      switch (values[key].values[i].name) {
        case "em":
          orderList += `<strong>${values[key].values[i].value}</strong>`;
          break;
        case "strikethrough":
          orderList += `<del>${values[key].values[i].value}</del>`;
          break;
        case "italic":
          orderList += `<em>${values[key].values[i].value}</em>`;
          break;
        case "emitalic":
          orderList += `<em><strong>${values[key].values[i].value}</strong></em>`;
          break;
        case "link": {
          const path = changeHtml(values[key].values[i].href);
          orderList += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
          break;
        }
        case "image":
          orderList += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
          break;
        case "video":
          orderList += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
          break;
        case "code":
          orderList += `<code class="inline-code">${values[key].values[i].value}</code>`;
          break;
        case "katex": {
          const html = Katex.renderToString(
            String.raw`\displaystyle ${values[key].values[i].value}`,
            {
              throwOnError: false,
            },
          );
          orderList += html;
          break;
        }
        default:
          if (values[key].values[i].value === "\n") {
            orderList += "<br>";
          } else {
            orderList += values[key].values[i].value;
          }
          break;
      }
    }
    orderList += "</li>\n";
    prev = values[key];
  }
  orderList += "</ol>\n";
  return orderList;
};
