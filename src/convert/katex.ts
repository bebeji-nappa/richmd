import * as Katex from "katex";

export const katex = (data: OptionalConvert) => {
  const html = Katex.renderToString(String.raw`\displaystyle ${data.values[0].value}`, {
    throwOnError: false,
  });
  return `<pre class="math katex-center">\n${html}\n</pre>\n`;
};
