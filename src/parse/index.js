import parser from './parser/index.js';
import Tree from './Tree.js';

const mdParse = mdString => {
  const ast = parser(mdString);

  return new Tree(ast);
};

export default mdParse.parse = parser;
