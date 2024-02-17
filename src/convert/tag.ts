export const startTag = (data: Convert) => {
  if (!data.tag) {
    if (!data.style) {
      return `<div>\n`;
    } else {
      return `<div class="${data.style}">\n`;
    }
  } else {
    if (!data.style) {
      return `<${data.tag}>\n`;
    } else {
      return `<${data.tag} class="${data.style}">\n`;
    }
  }
};

export const endTag = (data: Convert) => {
  if (!data.tag) {
    return `</div>\n`;
  } else {
    return `</${data.tag}>\n`;
  }
};
