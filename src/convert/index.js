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
    } else {
      text += data.value
    }
  }
  text += `</p>\n`
  return text
}

export const blockquote = (values) => {
  let bq = `<blockquote>\n`
  for (const data of values) {
    for (const bqValue of data) {
      bq += paragraph(bqValue)
    }
  }
  bq += `</blockquote>\n`
  return bq
}

export const list = (value, className) => {
  return className ? `<li class="${className}">${value}</li>\n` : `<li>${value}</li>\n`
}

export const ulist = (values) => {
  let prev = null
  let ulist = `<ul>\n`
  for (const data of values) {
    if (prev && data.level > prev.level) {
      ulist += `<ul>\n`
    } else if (prev && data.level < prev.level){
      ulist += `</ul>\n`
    } 
    ulist += list(data.value[0].value)
    prev = data
  }
  ulist += `</ul>\n`
  console.log(ulist)
  return ulist
}

export const checklist = (values) => {
  let prev = null
  let clist = `<ul>\n`
  for (const data of values) {
    console.log(data)
    if (prev && data.level > prev.level) {
      clist += `<ul>\n`
    } else if (prev && data.level < prev.level){
      clist += `</ul>\n`
    } 

    if (data.checked) { 
      clist += list(`<input type="checkbox" value="${data.value[0].value}" checked>\n`, "checklist")
    } else { 
      clist += list(`<input type="checkbox" value="${data.value[0].value}">\n`, "checklist")
    }
    prev = data
  }
 clist += `</ul>\n`
 return clist
}

export const orderedlist = (values) => {
  let olist = `<ol>\n`
  for (const data of values) {
    olist += list(data.value)
  }
  olist += `</ol>\n`
  return olist
}

export const code = (data) => {
  return `<pre>\n<code class="${data.syntax}">\n${data.values[0].value}\n</code>\n</pre>\n`
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
      tableblock += `<td>${column}</td>\n`
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
