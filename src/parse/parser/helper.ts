const EMPTY_REGEX = /^\s*$/;

const isEmpty = (str: string) => {
  return str.length === 0 || EMPTY_REGEX.test(str);
};

export default {
  isEmpty,
};
