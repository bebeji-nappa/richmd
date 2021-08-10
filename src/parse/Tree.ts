type mdTree = {
  level: number
  name: string
  values: object[] & value[]
  checked: boolean
  summary: string

}

type value = {
  value: string
}

export default class Tree {
  ast: object[] & mdTree[]
  constructor(ast) {
    this.ast = ast;
  }
};
