import "../type"

export default class Tree {
  ast: object[] & Convert[]
  constructor(ast: object[] & Convert[]) {
    this.ast = ast;
  }
};
