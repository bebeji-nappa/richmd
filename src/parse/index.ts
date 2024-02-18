import { parser } from "./parser/block";
import Tree from "./Tree";

export const parseMdTree = (mdString: string) => {
  const ast = parser(mdString);

  return new Tree(ast);
};
