import { parser } from "./parser/block";
import Tree from "./Tree";

export default (mdString: string) => {
  const ast = parser(mdString);

  return new Tree(ast);
};

export const parse = parser;
