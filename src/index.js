import mtp from '@/parse/index.js'
import * as convert from '@/convert/index.js'

export const mdConvert = (text) => {
  const mdTree = mtp(text);
  let htmlValue = ``
  let prev = null
  let bqValue = [];
  let listValue = [];
  for (const line of mdTree) {
    if(line.name === "heading") {
      htmlValue += convert.heading(line.level, line.values[0].value)
      prev = line
    } else if (line.name === "paragraph") {
      if (prev.name === "blockquote") {
        bqValue.push(line.values)
      } else {
        htmlValue += convert.paragraph(line.values)
      }
      prev = line
    } else if (line.name === "blockquote") {
      bqValue.push(line.values)
      prev = line
    } else if (line.name === "list") {
      listValue.push({ level: line.level, value: line.values })
      prev = line
    } else if (line.name === "checklist") {
      listValue.push({ level: line.level, value: line.values, checked: line.checked })
      prev = line
    } else if (line.name === "orderedlist") {
      htmlValue += convert.orderedlist(line.values)
      prev = line
    } else if (line.name === "code") {
      htmlValue += convert.code(line)
    } else if (line.name === "horizontal") {
      htmlValue += convert.horizontal()
    } else if (line.name === "br") {
      if (bqValue.length !== 0) {
        console.log(bqValue)
        htmlValue += convert.blockquote(bqValue)
        bqValue = []
        continue
      }
      if (prev.name === "list") {
        htmlValue += convert.ulist(listValue)
        listValue = []
        continue
      }
      if (prev.name === "checklist") {
        htmlValue += convert.checklist(listValue)
        listValue = []
        continue
      }
      if(prev.name === line.name) {
        continue
      }
      htmlValue += convert.br()
      prev = line
    }
  }
  return htmlValue
}
