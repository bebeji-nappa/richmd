export const startDetails = (data: string) => {
  return `<details class="details"><summary class="summary">${data}</summary>\n`;
};

export const endDetails = () => {
  return `</details>\n`;
};
