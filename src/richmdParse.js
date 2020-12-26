const mtp = require("../lib/parse/index.js");
const convert = require("./convert/index.js");

exports.richmd = (text) => {
  const mdTree = mtp(text).ast;
  let htmlValue = ``
  let prev = null
  let bqValue = [];
  let listValue = [];
  for (const line of mdTree) {
    if(line.name === "heading") {
      if (line.values.length !== 0) {
        htmlValue += convert.heading(line.level, line.values[0].value)
      }
      prev = line
    } else if (line.name === "paragraph") {
      if (prev && prev.name === "blockquote") {
        bqValue.push(line.values)
        if (line === mdTree[mdTree.length-1]) {
          htmlValue += convert.blockquote(bqValue)
        }
      } else {
        htmlValue += convert.paragraph(line.values)
      }
      prev = line
    } else if (line.name === "blockquote") {
      bqValue.push(line.values)
      prev = line
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.blockquote(bqValue)
      }
    } else if (line.name === "list") {
      listValue.push({ level: line.level, value: line.values })
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.ulist(listValue)
      }
      prev = line
    } else if (line.name === "checklist") {
      listValue.push({ level: line.level, value: line.values, checked: line.checked })
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.checklist(listValue)
      }
      prev = line
    } else if (line.name === "orderedlist") {
      listValue.push(line.values)
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.orderedlist(listValue)
      }
      prev = line
    } else if (line.name === "code") {
      htmlValue += convert.code(line)
    } else if (line.name === "horizontal") {
      htmlValue += convert.horizontal()
    } else if(line.name === "table") {
      htmlValue += convert.table(line)
    } else if (line.name === "katex") {
      htmlValue += convert.katex(line)
    } else if (line.name === "color") {
      htmlValue += convert.colorBlock(line)
    } else if (line.name === "startDetails") {
      htmlValue += convert.startDetails(line.summary)
    } else if (line.name === "endDetails") {
      htmlValue += convert.endDetails()
    } else if (line.name === "br") {
      if (bqValue.length !== 0) {
        htmlValue += convert.blockquote(bqValue)
        bqValue = []
        continue
      } else if (prev && prev.name === "list") {
        htmlValue += convert.ulist(listValue)
        listValue = []
        continue
      } else if (prev && prev.name === "orderedlist") {
        htmlValue += convert.orderedlist(listValue)
        listValue = []
        continue
      } else if (prev && prev.name === "checklist") {
        htmlValue += convert.checklist(listValue)
        listValue = []
        continue
      } else if (prev && prev.name === "br") {
        continue
      }
      htmlValue += convert.br()
      prev = line
    }
  }
  return htmlValue
}

// RIchMD CLI 用
exports.richmdCli = (text) => {
  const mdTree = mtp(text).ast;
  let htmlValue = ``
  let prev = null
  let bqValue = [];
  let listValue = [];
  for (const line of mdTree) {
    if (line.name === "import") {
      htmlValue += convert.import(line.value)
      prev = line
    } else if(line.name === "heading") {
      if (line.values.length !== 0) {
        htmlValue += convert.heading(line.level, line.values[0].value)
      }
      prev = line
    } else if (line.name === "paragraph") {
      if (prev && prev.name === "blockquote") {
        bqValue.push(line.values)
        if (line === mdTree[mdTree.length-1]) {
          htmlValue += convert.blockquote(bqValue)
        }
      } else {
        htmlValue += convert.paragraph(line.values)
      }
      prev = line
    } else if (line.name === "blockquote") {
      bqValue.push(line.values)
      prev = line
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.blockquote(bqValue)
      }
    } else if (line.name === "list") {
      listValue.push({ level: line.level, value: line.values })
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.ulist(listValue)
      }
      prev = line
    } else if (line.name === "checklist") {
      listValue.push({ level: line.level, value: line.values, checked: line.checked })
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.checklist(listValue)
      }
      prev = line
    } else if (line.name === "orderedlist") {
      listValue.push(line.values)
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.orderedlist(listValue)
      }
      prev = line
    } else if (line.name === "code") {
      htmlValue += convert.code(line)
    } else if (line.name === "horizontal") {
      htmlValue += convert.horizontal()
    } else if(line.name === "table") {
      htmlValue += convert.table(line)
    } else if (line.name === "katex") {
      htmlValue += convert.katex(line)
    }else if (line.name === "color") {
      htmlValue += convert.colorBlock(line)
    } else if (line.name === "startDetails") {
      htmlValue += convert.startDetails(line.summary)
    } else if (line.name === "endDetails") {
      htmlValue += convert.endDetails()
    } else if (line.name === "br") {
      if (bqValue.length !== 0) {
        htmlValue += convert.blockquote(bqValue)
        bqValue = []
        continue
      } else if (prev && prev.name === "list") {
        htmlValue += convert.ulist(listValue)
        listValue = []
        continue
      } else if (prev && prev.name === "orderedlist") {
        htmlValue += convert.orderedlist(listValue)
        listValue = []
        continue
      } else if (prev && prev.name === "checklist") {
        htmlValue += convert.checklist(listValue)
        listValue = []
        continue
      } else if (prev && prev.name === "br") {
        continue
      } else if (prev && prev.name === "import") {
        htmlValue += `</head>\n<body class="body">\n`
        continue
      }
      htmlValue += convert.br()
      prev = line
    }
  }
  return htmlValue
}
