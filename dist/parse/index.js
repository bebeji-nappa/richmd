import { parser } from "./parser/block";
import Tree from "./Tree";
export default (mdString) => {
    const ast = parser(mdString);
    return new Tree(ast);
};
export const parse = parser;
