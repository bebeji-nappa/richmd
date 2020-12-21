import mtp from './parse/index.js'
import * as convert from './convert/index.js'

export const mdConvert = (text: string) => {
  const mdTree = mtp(text);
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
      // htmlValue += convert.orderedlist(line.values)
      prev = line
    } else if (line.name === "code") {
      htmlValue += convert.code(line)
    } else if (line.name === "horizontal") {
      htmlValue += convert.horizontal()
    } else if(line.name === "table") {
      htmlValue += convert.table(line)
    } else if (line.name === "br") {
      if (bqValue.length !== 0) {
        htmlValue += convert.blockquote(bqValue)
        bqValue = []
        continue
      }
      if (prev && prev.name === "list") {
        htmlValue += convert.ulist(listValue)
        listValue = []
        continue
      }
      if (prev && prev.name === "orderedlist") {
        htmlValue += convert.orderedlist(listValue)
        listValue = []
        continue
      }
      if (prev && prev.name === "checklist") {
        htmlValue += convert.checklist(listValue)
        listValue = []
        continue
      }
      if (prev && prev.name === line.name) {
        continue
      }
      htmlValue += convert.br()
      prev = line
    }
  }
  return htmlValue
}
