import { parser } from "./parser/block";
import Tree from "./Tree";

export default (mdString: Object) => {
  const ast = parser(mdString);

  return new Tree(ast);
};

export const parse = parser;
