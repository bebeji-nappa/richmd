import hljs, { Language } from "highlight.js";

export const code = (data: OptionalConvert) => {
  let language: Language | undefined;
  let codeblock = '<pre class="code-block">\n';
  if (data.file !== undefined) {
    codeblock += `<span class="filename"><span>${data.file}</span></span>\n`;
  }
  if (!data.syntax) {
    codeblock += '<div class="code"><code class="codefont txt">\n';
  } else if (data.syntax === "txt") {
    codeblock += '<div class="code"><code class="codefont txt">\n';
  } else {
    codeblock += `<div class="code"><code class="codefont language-${data.syntax}">\n`;
    language = hljs.getLanguage(data.syntax);
  }

  const codeData = data.values[0].value.split(/\r?\n{2,}/g);
  for (const key in codeData) {
    codeblock +=
      language && data.syntax !== "txt"
        ? `${hljs.highlight(codeData[key], { language: language?.name ?? "text" }).value}\n`
        : `${codeData[key]}\n`;
    if (Number(key) !== codeData.length - 1) {
      codeblock += "<br />\n";
    }
  }
  codeblock += "</code></div>\n";
  codeblock += "</pre>\n";
  return codeblock;
};
