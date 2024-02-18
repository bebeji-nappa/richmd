import Katex from "katex";
import { changeHtml } from "./changeHtml";

export const checklist = (values: List[]) => {
  let prev: List | null = null;
  let clist = '<ul class="ul checklist">\n';
  for (const key in values) {
    if (prev && values[key].level > prev.level) {
      clist += '<ul class="ul">\n';
    } else if (prev && values[key].level < prev.level) {
      for (let i = 0; i < prev.level - values[key].level; i += 1) {
        clist += "</ul>\n";
      }
    }
    clist += '<li class="li checklist">';
    if (values[key].checked) {
      clist += '<input type="checkbox" checked="checked">';
    } else {
      clist += '<input type="checkbox">';
    }
    for (const i in values[key].values) {
      switch (values[key].values[i].name) {
        case "em":
          clist += `<strong>${values[key].values[i].value}</strong>`;
          break;
        case "strikethrough":
          clist += `<del>${values[key].values[i].value}</del>`;
          break;
        case "italic":
          clist += `<em>${values[key].values[i].value}</em>`;
          break;
        case "emitalic":
          clist += `<em><strong>${values[key].values[i].value}</strong></em>`;
          break;
        case "link": {
          const path = changeHtml(values[key].values[i].href);
          clist += `<a href="${path}" class="a">${values[key].values[i].title}</a>`;
          break;
        }
        case "image":
          clist += `<img src="${values[key].values[i].src}" alt="${values[key].values[i].alt}" class="img" />`;
          break;
        case "video":
          clist += `<video controls preload="none" class="video">\n<source src="${values[key].values[i].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
          break;
        case "code":
          clist += `<code class="inline-code">${values[key].values[i].value}</code>`;
          break;
        case "katex": {
          const html = Katex.renderToString(
            String.raw`\displaystyle ${values[key].values[i].value}`,
            {
              throwOnError: false,
            },
          );
          clist += html;
          break;
        }
        default: {
          if (values[key].values[i].value === "\n") {
            clist += "<br>";
          } else {
            clist += values[key].values[i].value;
          }
          break;
        }
      }
    }
    clist += "</li>\n";
    prev = values[key];
  }
  clist += "</ul>\n";
  return clist;
};
