import Katex from 'katex';

export const heading = (level, value) => {
  return `<h${level}>${value}</h${level}>\n`
}

export const paragraph = (values) => {
  let text = `<p>\n`
  for(const data of values) {
    if (data.name === "em") {
      text += `<strong>${data.value}</strong>`
    } else if (data.name === "strikethrough") {
      text += `<del>${data.value}</del>`
    } else if (data.name === "italic") {
      text += `<em>${data.value}</em>`
    } else if(data.name === "link") {
      text += `<a href="${data.href}">${data.title}</a>`
    } else if(data.name === "image") {
      text += `<img src="${data.src}" alt="${data.alt}" />`
    } else if(data.name === "code") {
      text += `<code>${data.value}</code>`
    } 
    else {
      text += data.value
    }
  }
  text += `</p>\n`
  return text
}

export const blockquote = (values) => {
  let bq = `<blockquote>\n`
  for (const data of values) {
    let text = `<p>\n`
    for (const val of data) {
      if (val.name === "em") {
        text += `<strong>${val.value}</strong>`
      } else if (val.name === "strikethrough") {
        text += `<del>${val.value}</del>`
      } else if (val.name === "italic") {
        text += `<em>${val.value}</em>`
      } else if(val.name === "link") {
        text += `<a href="${val.href}">${val.title}</a>`
      } else if(val.name === "image") {
        text += `<img src="${val.src}" alt="${val.alt}" />`
      } else if(val.name === "code") {
        text += `<code>${val.value}</code>`
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

export const ulist = (values) => {
  let prev = null
  let ulist = `<ul>\n`
  for (const data of values) {
    if (prev && data.level > prev.level) {
      ulist += `<ul>\n`
      ulist += `<li>\n`
      ulist += `${data.value[0].value}\n`;
      ulist += `</li>\n`
    } else if (prev && data.level < prev.level) {
      for (let i = 0; i < prev.level - data.level; i++) {
        ulist += `</ul>\n`
      }
      ulist += `<li>\n` 
      ulist += `${data.value[0].value}\n`
      ulist += `</li>\n`
    } else if (prev && data.level === prev.level) {
      ulist += `<li>\n`
      ulist += `${data.value[0].value}\n`
      ulist += `</li>\n`
    } else {
      ulist += `<li>\n` 
      ulist += `${data.value[0].value}\n`
      ulist += `</li>\n`
    }
    prev = data
  }
  ulist += `</ul>\n`
  return ulist
}

export const checklist = (values) => {
  let prev = null
  let clist = `<ul class="checklist">\n`
  for (const data of values) {
    if (prev && data.level > prev.level) {
      clist += `<ul class="checklist">\n`
      clist += `<li>\n`
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
      clist += `<li>\n` 
      if(data.checked) {
        clist += `<input type="checkbox" checked="checked">${data.value[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${data.value[0].value}\n`;
      }
      clist += `</li>\n`
    } else if (prev && data.level === prev.level) {
      clist += `<li>\n`
      if(data.checked) {
        clist += `<input type="checkbox" checked="checked">${data.value[0].value}\n`;
      } else {
        clist += `<input type="checkbox">${data.value[0].value}\n`;
      }
      clist += `</li>\n`
    } else {
      clist += `<li>\n` 
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

export const orderedlist = (values) => {
  let olist = `<ol>\n`
  for (const datalist of values) {
    for (const data of datalist) {
      olist += `<li>${data.value}</li>\n`
    }
  }
  olist += `</ol>\n`
  return olist
}

export const code = (data) => {
  return `<pre>\n<code class="${data.syntax}">\n${data.values[0].value}\n</code>\n</pre>\n`
}

export const katex = (data) => {
  const html = Katex.renderToString(String.raw`${data.values[0].value}`, {
    throwOnError: false
  });
  return `<pre class="math">\n${html}\n</pre>\n`
}

export const horizontal = () => {
  return `<hr />\n`
}

export const table = (data) => {
  let tableblock = `<table>\n`
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

export const br = () => {
  return `<br />\n`
}
