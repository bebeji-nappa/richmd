import Katex from "katex";
import { changeHtml } from "./changeHtml";

export const table = (data: Convert) => {
  let tableblock = '<table class="table">\n';
  tableblock += "<thead>\n<tr>\n";
  for (const heading of data.headings) {
    tableblock += `<th>${heading}</th>\n`;
  }
  tableblock += "</thead>\n</tr>\n";
  tableblock += "<tbody>\n";
  for (const row of data.rows) {
    tableblock += "<tr>\n";
    for (const column of row) {
      tableblock += "<td>";
      for (const key in column) {
        switch (column[key].name) {
          case "em":
            tableblock += `<strong>${column[key].value}</strong>`;
            break;
          case "strikethrough":
            tableblock += `<del>${column[key].value}</del>`;
            break;
          case "italic":
            tableblock += `<em>${column[key].value}</em>`;
            break;
          case "emitalic":
            tableblock += `<em><strong>${column[key].value}</strong></em>`;
            break;
          case "link": {
            const path = changeHtml(column[key].href);
            tableblock += `<a href="${path}" class="a">${column[key].title}</a>`;
            break;
          }
          case "image":
            tableblock += `<img src="${column[key].src}" alt="${column[key].alt}" class="img" />`;
            break;
          case "video":
            tableblock += `<video controls preload="none" class="video">\n<source src="${column[key].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
            break;
          case "code":
            tableblock += `<code class="inline-code">${column[key].value}</code>`;
            break;
          case "katex": {
            const html = Katex.renderToString(String.raw`\displaystyle ${column[key].value}`, {
              throwOnError: false,
            });
            tableblock += html;
            break;
          }
          default:
            tableblock += column[key].value;
            break;
        }
      }
      tableblock += "</td>\n";
    }
    tableblock += "</tr>\n";
  }
  tableblock += "</tbody>\n";
  tableblock += "</table>\n";
  return tableblock;
};
