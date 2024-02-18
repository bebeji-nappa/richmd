import Katex from "katex";
import { changeHtml } from "./changeHtml";

export const ulist = (values: List[]) => {
  let prev: List | null = null;
  let list = '<ul class="ul">\n';
  for (const key in values) {
    if (prev && values[key].level > prev.level) {
      list += '<ul class="ul">\n';
    } else if (prev && values[key].level < prev.level) {
      for (let i = 0; i < prev.level - values[key].level; i += 1) {
        list += "</ul>\n";
      }
    }
    list += '<li class="li">';
    for (const i in values[key].values) {
      switch (values[key].values[i].name) {
        case "em":
          list += `<strong>${values[key].values[i].value}</strong>`;
          break;
        case "strikethrough":
          list += `<del>${values[key].values[i].value}</del>`;
          break;
        case "italic":
          list += `<em>${values[key].values[i].value}</em>`;
          break;
        case "emitalic":
          list += `<em><strong>${values[key].values[i].value}</strong></em>`;
          break;
        case "link": {
          const path = changeHtml(values[key].values[i].href);
          list += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
          break;
        }
        case "image":
          list += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
          break;
        case "video":
          list += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
          break;
        case "code":
          list += `<code class="inline-code">${values[key].values[i].value}</code>`;
          break;
        case "katex": {
          const html = Katex.renderToString(
            String.raw`\displaystyle ${values[key].values[i].value}`,
            {
              throwOnError: false,
            },
          );
          list += html;
          break;
        }
        default:
          if (values[key].values[i].value === "\n") {
            list += "<br>";
          } else {
            list += values[key].values[i].value;
          }
          break;
      }
    }
    list += "</li>\n";
    prev = values[key];
  }
  list += "</ul>\n";
  return list;
};
