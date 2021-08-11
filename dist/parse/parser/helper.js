const EMPTY_REGEX = /^\s*$/;
const isEmpty = (str) => {
    return str.length === 0 || EMPTY_REGEX.test(str);
};
export default {
    isEmpty,
};
