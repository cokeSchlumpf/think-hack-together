export default {
  isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },

  mkString(array, separator = ', ', before = '', after = '') {
    return array.reduce((result, item, index) => {
        let newResult = result;

        if (index > 0) {
          newResult = newResult + separator;
        }

        return newResult + item;
      }, before) + after;
  }
};
