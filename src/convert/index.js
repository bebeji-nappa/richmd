const Katex = require("katex");
const hljs = require("highlight.js");

exports.heading = (level, value) => {
  return `<h${level} class="h${level}">${value}</h${level}>\n`
}

exports.paragraph = (values) => {
  let text = `<p class="p">\n`
  for(const data of values) {
    if (data.name === "em") {
      text += `<strong>${data.value}</strong>`
    } else if (data.name === "strikethrough") {
      text += `<del>${data.value}</del>`
    } else if (data.name === "italic") {
      text += `<em>${data.value}</em>`
    } else if (data.name === "emitalic") {
      text += `<em><strong>${data.value}</strong></em>`
    } else if (data.name === "link") {
      text += `<a href="${data.href}" class="a">${data.title}</a>`
    } else if (data.name === "image") {
      text += `<img src="${data.src}" alt="${data.alt}" class="img" />`
    } else if (data.name === "code") {
      text += `<code class="inline-code">${data.value}</code>`
    } else if (data.name === "katex") {
      const html = Katex.renderToString(String.raw`\textstyle ${data.value}`, {
        throwOnError: false
      });
      text += html
    }
    else {
      text += data.value
    }
  }
  text += `</p>\n`
  return text
}

exports.blockquote = (values) => {
  let bq = `<blockquote class="blockquote">\n`
  for (const data of values) {
    let text = `<p class="p">\n`
    for (const val of data) {
      if (val.name === "em") {
        text += `<strong>${val.value}</strong>`
      } else if (val.name === "strikethrough") {
        text += `<del>${val.value}</del>`
      } else if (val.name === "italic") {
        text += `<em>${val.value}</em>`
      } else if (data.name === "emitalic") {
        text += `<em><strong>${data.value}</strong></em>`
      } else if(val.name === "link") {
        text += `<a href="${val.href}" class="a">${val.title}</a>`
      } else if(val.name === "image") {
        text += `<img src="${val.src}" alt="${val.alt}" />`
      } else if(val.name === "code") {
        text += `<code class="inline-code">${val.value}</code>`
      } 
      else {
        text += val.value
      }
    }
    text += `</p>\n`
    bq += text
  }
  bq += `</blockquote>\n`
  return bq
}

exports.ulist = (values) => {
  let prev = null
  let ulist = `<ul class="ul">\n`
  for (const data of values) {
    if (prev && data.level > prev.level) {
      ulist += `<ul class="ul">\n`
      ulist += `<li class="li">\n`
      ulist += `${data.value[0].value}\n`;
      ulist += `</li>\n`
    } else if (prev && data.level < prev.level) {
      for (let i = 0; i < prev.level - data.level; i++) {
        ulist += `</ul>\n`
      }
      ulist += `<li class="li">\n` 
      ulist += `${data.value[0].value}\n`
      ulist += `</li>\n`
    } else if (prev && data.level === prev.level) {
      ulist += `<li class="li">\n`
      ulist += `${data.value[0].value}\n`
      ulist += `</li>\n`
    } else {
      ulist += `<li class="li">\n` 
      ulist += `${data.value[0].value}\n`
      ulist += `</li>\n`
    }
    prev = data
  }
  ulist += `</ul>\n`
  return ulist
}

exports.checklist = (values) => {
  let prev = null
  let clist = `<ul class="ul">\n`
  for (const data of values) {
    if (prev && data.level > prev.level) {
      clist += `<ul class="ul">\n`
      clist += `<li class="li checklist">\n`
      if(data.checked) {
        clist += `<input type="checkbox" checked="checked">${data.value[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${data.value[0].value}\n`;
      }
      clist += `</li>\n`
    } else if (prev && data.level < prev.level) {
      for (let i = 0; i < prev.level - data.level; i++) {
        clist += `</ul>\n`
      }
      clist += `<li class="li checklist">\n` 
      if(data.checked) {
        clist += `<input type="checkbox" checked="checked">${data.value[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${data.value[0].value}\n`;
      }
      clist += `</li>\n`
    } else if (prev && data.level === prev.level) {
      clist += `<li class="li checklist">\n`
      if(data.checked) {
        clist += `<input type="checkbox" checked="checked">${data.value[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${data.value[0].value}\n`;
      }
      clist += `</li>\n`
    } else {
      clist += `<li class="li checklist">\n` 
      if(data.checked) {
        clist += `<input type="checkbox" checked="checked">${data.value[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${data.value[0].value}\n`;
      }
      clist += `</li>\n`
    }
    prev = data
  }
  clist += `</ul>\n`
  return clist
}

exports.orderedlist = (values) => {
  let olist = `<ol class="ol">\n`
  for (const datalist of values) {
    for (const data of datalist) {
      olist += `<li class="li">${data.value}</li>\n`
    }
  }
  olist += `</ol>\n`
  return olist
}

exports.code = (data) => {
  let codeblock = `<pre class="code">\n`
  if (data.file !== undefined) {
    codeblock += `<span class="filename">${data.file}</span>\n`
  }
  if (!data.syntax) {
    codeblock += `<code class="codefont txt">\n${data.values[0].value}\n</code>\n`
  } else if (data.syntax === "txt") {
    codeblock += `<code class="codefont txt">\n${data.values[0].value}\n</code>\n`
  } else {
    codeblock += `<code class="codefont ${data.syntax}">\n${hljs.highlightAuto(`${data.values[0].value}`).value}\n</code>\n`
  }
  codeblock += `</pre>\n`
  return codeblock
}

exports.katex = (data) => {
  const html = Katex.renderToString(String.raw`\displaystyle${data.values[0].value}`, {
    throwOnError: false
  });
  return `<pre class="math katex-center">\n${html}\n</pre>\n`
}

exports.horizontal = () => {
  return `<hr />\n`
}

exports.table = (data) => {
  let tableblock = `<table class="table">\n`
  tableblock += `<thead>\n<tr>\n`
  for (const heading of data.headings) {
    tableblock += `<th>${heading}</th>\n`
  }
  tableblock += `</thead>\n</tr>\n`
  tableblock += `<tbody>\n`
  for (const row of data.rows) {
    tableblock += `<tr>\n`
    for (const column of row) {
      for (const obj of column) {
        tableblock += `<td>${obj.value}</td>\n`
      }
    }
    tableblock += `</tr>\n`
  }
  tableblock += `</tbody>\n`
  tableblock += `</table>\n`
  return tableblock
}

exports.br = () => {
  return `<br class="br" />\n`
}

exports.colorBlock = (datas) => {
  let text = `<pre class="message message-${datas.style}">\n`
  for(const data of datas.values) {
    if (data.name === "em") {
      text += `<strong>${data.value}</strong>`
    } else if (data.name === "strikethrough") {
      text += `<del>${data.value}</del>`
    } else if (data.name === "italic") {
      text += `<em>${data.value}</em>`
    } else if (data.name === "emitalic") {
      text += `<em><strong>${data.value}</strong></em>`
    } else if(data.name === "link") {
      text += `<a href="${data.href}" class="a">${data.title}</a>`
    } else if(data.name === "image") {
      text += `<img src="${data.src}" alt="${data.alt}" />`
    } else if(data.name === "code") {
      text += `<code class="inline-code">${data.value}</code>`
    } 
    else {
      text += data.value
    }
  }
  text += `</pre>\n`
  return text
}

exports.import = (data) => {
  return `<link rel="stylesheet" href="${data}">\n`
}

exports.startDetails = (data) => {
  return `<details><summary>${data}</summary>\n`
}

exports.endDetails = () => {
  return `</details>\n`
}

exports.startTag = (data) => {
  const tags = [ 
    "div", 
    "menu", 
    "main", 
    "section", 
    "article", 
    "header", 
    "aside",
    "nav",
    "footer"
  ]

  if (!data.tag) {
    if (!data.style) {
      return `<div>\n`
    } else {
      return `<div class="${data.style}">\n`
    }
  } else {
    if (tags.includes(data.tag)) {
      if (!data.style) {
        return `<${data.tag}>\n`
      } else {
        return `<${data.tag} class="${data.style}">\n`
      }
    } else {
      return `<div>\n`
    }
  }
  
}

exports.endTag = (data) => {
  const tags = [ 
    "div", 
    "menu", 
    "main", 
    "section", 
    "article", 
    "header", 
    "aside",
    "nav",
    "footer"
  ]
  
  if(!data.tag) {
    return `</div>\n`
  }
  if (tags.includes(data.tag)) {
    return `</${data.tag}>\n`
  } else {
    return `</div>\n`
  }
}
