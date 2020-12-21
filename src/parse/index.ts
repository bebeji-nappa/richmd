import { parser } from './parser/index';
import Tree from './Tree';

const mdParse = mdString => {
  const ast = parser(mdString);

  return new Tree(ast);
};

export default mdParse.parse = parser;
