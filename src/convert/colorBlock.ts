import { changeHtml } from "./changeHtml";

export const colorBlock = (datas: Convert) => {
  let text = `<div class="message message-${datas.style}"><div class="message-icon-${datas.style}"></div>`;
  text += '<pre class="message-box">';
  const data = datas.values;
  text += "<span>";
  for (const key in data) {
    switch (data[key].name) {
      case "em":
        text += `<strong>${data[key].value}</strong>`;
        break;
      case "strikethrough":
        text += `<del>${data[key].value}</del>`;
        break;
      case "italic":
        text += `<em>${data[key].value}</em>`;
        break;
      case "emitalic":
        text += `<em><strong>${data[key].value}</strong></em>`;
        break;
      case "link": {
        const path = changeHtml(data[key].href);
        text += `<a href="${path}" class="a">${data[key].title}</a>`;
        break;
      }
      case "image":
        text += `<img src="${data[key].src}" alt="${data[key].alt}" />`;
        break;
      case "video":
        text += `<video controls preload="none" class="video">\n<source src="${data[key].src}" />\nSorry, your browser doesn't support embedded videos.\n</video>`;
        break;
      case "code":
        text += `<code class="inline-code">${data[key].value}</code>`;
        break;
      default:
        if (data[key].value === "\n") {
          text += "<br>";
        } else {
          text += data[key].value.replace(/\n/g, "<br>");
        }
        break;
    }
  }
  text += "</span>";
  text += "</pre></div>\n";
  return text;
};
