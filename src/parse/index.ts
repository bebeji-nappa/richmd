import { parser } from "./parser";
import Tree from "./Tree";

export const parseMdTree = (mdString: string) => {
  const ast: object[] & Convert[] = parser(mdString);

  return new Tree(ast);
};
