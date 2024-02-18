// リンク先の拡張子が .richmd の場合は .html に変換する
export const changeHtml = (path: string) => {
  const url = path.split("/");
  let dirpath = url.slice(0, -1).join("/");
  if (!dirpath) {
    dirpath = ".";
  }
  const file = url[url.length - 1].split(".");
  if (file[1] === "richmd") {
    file[1] = "html";
    const newfile = file.join(".");
    return [dirpath, newfile].join("/");
  }
  return path;
};
