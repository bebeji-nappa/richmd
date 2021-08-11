#! /usr/bin/env node

const { richmdCli } = require("../dist/index.js");
const fs = require("fs");
const fsExtra = require("fs-extra");
const mkdirp = require("mkdirp");
const program = require("commander");

const dirList = (path, dir) => {
  fs.readdir(path, function (err, files) {
    if (err) throw err;
    files.filter((file) => {
      if (file.match(/.*\.richmd$/)) {
        const name = file.split(`\.`);
        richmdText(`${path}/${file}`, dir, name[0]);
      }
    });
  });
};

const richmdText = (path, dir, name) => {
  fsExtra.mkdirp(dir);
  fs.readFile(path, { encoding: "utf8" }, (err, file) => {
    if (file !== undefined) {
      text += richmdCli(file);
      text += `</body>\n</html>`;
      fs.writeFile(`${program.dir}/${name[0]}.html`, text, (err, data) => {
        if (err) console.log(err);
        else console.log(`Complete!`);
      });
    } else {
      console.log("Undefined RichMD file");
    }
  });
};

let text = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
`;
program
  .version("2.1.1")
  .usage("[options] <file ...>")
  .option("-d, --dir [path]", "Add OutPut Directory", String, "./")
  .parse(process.argv);

const dirHierarchy = program.dir.trim().split(`\/`);
let relativePath = "";
for (const dir of dirHierarchy) {
  if (dir) {
    if (dir === `\.`) {
      continue;
    }
    relativePath += `\../`;
  }
}

text += `<link rel="stylesheet" href="${relativePath}node_modules/richmd-cli/lib/highlight/styles/atom-one-dark.min.css">
<script src="${relativePath}node_modules/richmd-cli/lib/highlight.min.js"></script>
<link rel="stylesheet" href="${relativePath}node_modules/richmd-cli/lib/katex/katex.min.css">
<script defer src="${relativePath}node_modules/richmd-cli/lib/katex/katex.min.js"></script>
<script defer src="${relativePath}node_modules/richmd-cli/lib/contrib/auto-render.min.js" onload="renderMathInElement(document.body);"></script>
<link rel="stylesheet" href="${relativePath}node_modules/richmd-cli/styles/normalize.css">
<link rel="stylesheet" href="${relativePath}node_modules/richmd-cli/styles/index.css">
`;

const filePath = program.args[0];
const patharr = filePath.trim().split(`\/`);
const lastFilePath = patharr[patharr.length - 1].trim();
const filename = patharr[patharr.length - 1].trim().split(`\.`);
if (!lastFilePath) {
  dirList(filePath, program.dir);
} else {
  if (!/\./.test(lastFilePath)) {
    dirList(filePath, program.dir);
  } else {
    if (filename[1] !== "richmd") {
      console.log(`Error!\nThis file is not RichMD file (***.richmd).`);
    } else {
      richmdText(filePath, program.dir, filename);
    }
  }
}
