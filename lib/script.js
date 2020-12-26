#! /usr/bin/env node

const { richmdCli } = require("../src/richmdParse.js");
const fs = require("fs");
const fsExtra = require('fs-extra');
const mkdirp = require("mkdirp")
const program = require("commander");

let text = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
`
program
  .version('1.0.1')
  .usage('[options] <file ...>')
  .option('-d, --dir [path]', 'Add OutPut Directory', String, "./")
  .parse(process.argv);

const filePath = program.args[0];
const patharr = filePath.trim().split(`\/`);
const filename = patharr[patharr.length - 1].trim().split(`\.`);
const dirHierarchy = program.dir.trim().split(`\/`);
let relativePath = '';
console.log(program.dir)
console.log(dirHierarchy)
  for (const dir of dirHierarchy) {
    if (dir) {
      if(dir === `\.`) {
        continue
      }
      relativePath += `\../`;
    }
  }

text += `<link rel="stylesheet" href="${relativePath}node_modules/richmd/lib/highlight/styles/atom-one-dark.min.css">
<script src="${relativePath}node_modules/richmd/lib/highlight/highlight.min.js"></script>
<link rel="stylesheet" href="${relativePath}node_modules/richmd/lib/katex/katex.min.css">
<script defer src="${relativePath}node_modules/richmd/lib/katex/katex.min.js"></script>
<script defer src="${relativePath}node_modules/richmd/lib/katex/contrib/auto-render.min.js" onload="renderMathInElement(document.body);"></script>
<link rel="stylesheet" href="${relativePath}node_modules/richmd/styles/normalize.css">
<link rel="stylesheet" href="${relativePath}node_modules/richmd/styles/index.css">
`

if(filename[1] !== "richmd") {
  console.log(`Error!\nThis file is not RichMD file (***.richmd).`);
} else {
  fsExtra.mkdirp(program.dir)
  fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
    if(file !== undefined) {
      text += richmdCli(file)
      text += `</body>\n</html>`
      fs.writeFile(`${program.dir}/${filename[0]}.html`, text, (err, data) => {
        if(err) console.log(err);
        else console.log(`Complete!`)
      });
    } else {
      console.log("Undefined RichMD file")
    }
  });
}

