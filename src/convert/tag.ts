export const startTag = (data: Convert) => {
  if (!data.tag) {
    if (!data.style) {
      return "<span>";
    }
    return `<span class="${data.style}">`;
  }
  if (!data.style) {
    return `<${data.tag}>`;
  }
  return `<${data.tag} class="${data.style}">`;
};

export const endTag = (data: Convert) => {
  if (!data.tag) {
    return "</span>\n";
  }
  return `</${data.tag}>\n`;
};
