#! /usr/bin/env node

const { richmd } = require("./src/richmdParse.js");
const fs = require("fs");
const program = require("commander");

let text = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/atom-one-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/highlight.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js" integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js" integrity="sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa" crossorigin="anonymous"
    onload="renderMathInElement(document.body);"></script>
<link rel="stylesheet" href="node_modules/richmd/styles/normalize.css">
<link rel="stylesheet" href="node_modules/richmd/styles/index.css">
</head>
<body>
`

program.parse(process.argv);

const filePath = program.args[0];
const patharr = filePath.trim().split(`\/`);
const filename = patharr[patharr.length - 1].trim().split(`\.`);
if(filename[1] !== "richmd") {
  console.log(`Error!\nThis file is RMD file (***.rmd).`);
} else {
  fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
    text += richmd(file)
    text += `</body>\n</html>`
    fs.writeFile(`${filename[0]}.html`, text, (err, data) => {
      if(err) console.log(err);
      else console.log(`${filename[0]}.richmd convert to ${filename[0]}.html`)
    });
  });
}

