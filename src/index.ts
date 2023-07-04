import mtp from "./parse/index";
import * as convert from "./convert/index";

const parse = (text: string) => {
  const mdTree: object[] & Convert[] = mtp(text).ast
  let htmlValue = ""
  let prev;
  let bqValue: Convert[][] = [];
  let listValue: List[] = [];
  let orderListValue: List[] = [];
  for (const line in mdTree) {
    if (mdTree[line].name === "heading") {
      if (mdTree[line].values.length !== 0) {
        htmlValue += convert.heading(mdTree[line].level, mdTree[line].values);
      }
      prev = mdTree[line];
    } else if (mdTree[line].name === "paragraph") {
      if (prev && prev.name === "blockquote") {
        bqValue.push(mdTree[line].values);
        if (mdTree[line] === mdTree[mdTree.length - 1]) {
          htmlValue += convert.blockquote(bqValue);
        }
      } else {
        htmlValue += convert.paragraph(mdTree[line].values);
        prev = mdTree[line];
      }
    } else if (mdTree[line].name === "blockquote") {
      bqValue.push(mdTree[line].values);
      if (mdTree[line] === mdTree[mdTree.length - 1]) {
        htmlValue += convert.blockquote(bqValue);
      }
      prev = mdTree[line];
    } else if (mdTree[line].name === "list") {
      listValue.push({ level: mdTree[line].level, values: mdTree[line].values });
      if (mdTree[line] === mdTree[mdTree.length - 1]) {
        htmlValue += convert.ulist(listValue);
      }
      prev = mdTree[line];
    } else if (mdTree[line].name === "checklist") {
      listValue.push({ level: mdTree[line].level, values: mdTree[line].values, checked: mdTree[line].checked });
      if (mdTree[line] === mdTree[mdTree.length - 1]) {
        htmlValue += convert.checklist(listValue);
      }
      prev = mdTree[line];
    } else if (mdTree[line].name === "orderedlist") {
      orderListValue.push({ level: mdTree[line].level, values: mdTree[line].values });
      if (mdTree[line] === mdTree[mdTree.length - 1]) {
        htmlValue += convert.olist(orderListValue);
      }
      prev = mdTree[line];
    } else if (mdTree[line].name === "code") {
      htmlValue += convert.code(mdTree[line]);
    } else if (mdTree[line].name === "horizontal") {
      htmlValue += convert.horizontal();
    } else if (mdTree[line].name === "table") {
      htmlValue += convert.table(mdTree[line]);
    } else if (mdTree[line].name === "katex") {
      htmlValue += convert.katex(mdTree[line]);
    } else if (mdTree[line].name === "color") {
      htmlValue += convert.colorBlock(mdTree[line]);
    } else if (mdTree[line].name === "startDetails") {
      htmlValue += convert.startDetails(mdTree[line].summary);
    } else if (mdTree[line].name === "endDetails") {
      htmlValue += convert.endDetails();
    } else if (mdTree[line].name === "startTag") {
      htmlValue += convert.startTag(mdTree[line]);
    } else if (mdTree[line].name === "endTag") {
      htmlValue += convert.endTag(mdTree[line]);
      prev = mdTree[line];
    } else if (mdTree[line].name === "br") {
      if (bqValue.length !== 0) {
        htmlValue += convert.blockquote(bqValue);
        bqValue = [];
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "list") {
        htmlValue += convert.ulist(listValue);
        listValue = [];
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "orderedlist") {
        htmlValue += convert.olist(orderListValue);
        orderListValue = [];
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "checklist") {
        htmlValue += convert.checklist(listValue);
        listValue = [];
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "import") {
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "br") {
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "paragraph") {
        htmlValue += convert.br();
        prev = mdTree[line];
      } else if (prev && prev.name === "heading") {
        prev = mdTree[line];
        continue;
      } else {
        htmlValue += convert.br();
        prev = mdTree[line];
      }
    }
  }
  return htmlValue;
}

const cli = (text: string) => {
  const mdTree: object[] & Convert[] = mtp(text).ast
  let htmlValue = ""
  let prev;
  let bqValue: Convert[][] = [];
  let listValue: List[] = [];
  let orderListValue: Convert[][] = [];
  for (const line in mdTree) {
    if (mdTree[0] === mdTree[line]) {
      if (mdTree[line].name === "import") {
        htmlValue += convert.Import(mdTree[line].value);
        htmlValue += `</head>\n<body class="body">\n`;
        prev = mdTree[line];
      } else {
        htmlValue += `</head>\n<body class="body">\n`;
      }
    }
    if (mdTree[line].name === "heading") {
      if (mdTree[line].values.length !== 0) {
        htmlValue += convert.heading(mdTree[line].level, mdTree[line].values);
      }
      prev = mdTree[line];
    } else if (mdTree[line].name === "paragraph") {
      if (prev && prev.name === "blockquote") {
        bqValue.push(mdTree[line].values);
        if (mdTree[line] === mdTree[mdTree.length - 1]) {
          htmlValue += convert.blockquote(bqValue);
        }
      } else {
        htmlValue += convert.paragraph(mdTree[line].values);
        prev = mdTree[line];
      }
    } else if (mdTree[line].name === "blockquote") {
      bqValue.push(mdTree[line].values);
      prev = mdTree[line];
      if (mdTree[line] === mdTree[mdTree.length - 1]) {
        htmlValue += convert.blockquote(bqValue);
      }
    } else if (mdTree[line].name === "list") {
      listValue.push({ level: mdTree[line].level, values: mdTree[line].values });
      if (mdTree[line] === mdTree[mdTree.length - 1]) {
        htmlValue += convert.ulist(listValue);
      }
      prev = mdTree[line];
    } else if (mdTree[line].name === "checklist") {
      listValue.push({ level: mdTree[line].level, values: mdTree[line].values, checked: mdTree[line].checked });
      if (mdTree[line] === mdTree[mdTree.length - 1]) {
        htmlValue += convert.checklist(listValue);
      }
      prev = mdTree[line];
    } else if (mdTree[line].name === "orderedlist") {
      orderListValue.push(mdTree[line].values);
      if (mdTree[line] === mdTree[mdTree.length - 1]) {
        htmlValue += convert.orderedlist(orderListValue);
      }
      prev = mdTree[line];
    } else if (mdTree[line].name === "code") {
      htmlValue += convert.code(mdTree[line]);
    } else if (mdTree[line].name === "horizontal") {
      htmlValue += convert.horizontal();
    } else if (mdTree[line].name === "table") {
      htmlValue += convert.table(mdTree[line]);
    } else if (mdTree[line].name === "katex") {
      htmlValue += convert.katex(mdTree[line]);
    } else if (mdTree[line].name === "color") {
      htmlValue += convert.colorBlock(mdTree[line]);
    } else if (mdTree[line].name === "startDetails") {
      htmlValue += convert.startDetails(mdTree[line].summary);
    } else if (mdTree[line].name === "endDetails") {
      htmlValue += convert.endDetails();
    } else if (mdTree[line].name === "startTag") {
      htmlValue += convert.startTag(mdTree[line]);
    } else if (mdTree[line].name === "endTag") {
      htmlValue += convert.endTag(mdTree[line]);
      prev = mdTree[line];
    } else if (mdTree[line].name === "br") {
      if (bqValue.length !== 0) {
        htmlValue += convert.blockquote(bqValue);
        bqValue = [];
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "list") {
        htmlValue += convert.ulist(listValue);
        listValue = [];
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "orderedlist") {
        htmlValue += convert.orderedlist(orderListValue);
        orderListValue = [];
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "checklist") {
        htmlValue += convert.checklist(listValue);
        listValue = [];
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "br") {
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "import") {
        prev = mdTree[line];
        continue;
      } else if (prev && prev.name === "paragraph") {
        htmlValue += convert.br();
        prev = mdTree[line];
      } else if (prev && prev.name === "heading") {
        prev = mdTree[line];
        continue;
      }
    }
  }
  return htmlValue;
}

export const richmd = (text: string) => {
  return parse(text)
};

export const richmdCli = (text: string) => {
  return cli(text)
};
