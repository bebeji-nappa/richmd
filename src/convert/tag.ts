export const startTag = (data: Convert) => {
  if (!data.tag) {
    if (!data.style) {
      return `<span>`;
    } else {
      return `<span class="${data.style}">`;
    }
  } else {
    if (!data.style) {
      return `<${data.tag}>`;
    } else {
      return `<${data.tag} class="${data.style}">`;
    }
  }
};

export const endTag = (data: Convert) => {
  if (!data.tag) {
    return `</span>\n`;
  } else {
    return `</${data.tag}>\n`;
  }
};
