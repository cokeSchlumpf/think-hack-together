/**
 * This module extends the well known JS library underscore (http://underscorejs.org)
 * with additional util methods which can be used within the project for common
 * problems.
 *
 * @module underscore.
 */
import _ from 'underscore';

export default _.extend({}, _, {

  /**
   * Creates an array from string.
   * @param {string} string which contains an array.
   * @param {string} separator which separates the elements within the string. Default ','.
   * @param {boolean} stripWhitespace identifies if whitespaces should be stripped from elements.
   * @return {array} an array from the defined string.
   */
  arrayFromString(string, separator = ',', stripWhitespace = true) {
    return string.split(separator).map(s => {
      let result;
      if (stripWhitespace) {
        result = s.replace(/ /g, '');
      } else {
        result = s;
      }

      return result;
    });
  },

  /**
   * Creates a 2-dimensional matrix from an array.
   * @param {array} array is the initial array.
   * @param {number} elementsPerSubArray is the number of elements per sub array.
   * @return {array} a two-dimensional array.
   */
  arrayToMatrix(array, elementsPerSubArray) {
    let matrix = [];

    if (array) {
      let i;
      let k;

      for (i = 0, k = -1; i < array.length; i = i + 1) {
        if (i % elementsPerSubArray === 0) {
          k = k + 1;
          matrix[k] = [];
        }

        matrix[k].push(array[i]);
      }
    }

    return matrix;
  },

  /**
   * Creates an object which serves constant values. E.g: { CONSTANT_1: "CONSTANT_1", CONSTANT_2: "CONSTANT_2" }
   * @param {array} strings which are constant names. You can also have multiple string arguments instead of an array.
   * @return {object} which contains each string as key -> value pair.
   */
  constantsFromArray(strings) {
    return _.object(
      this.doIfElse(!_.isArray(strings), () => {
        return _.values(arguments);
      }, () => {
        return strings;
      }).map(value => {
        return [ value, value ];
      }));
  },

  /**
   * Helper method to provide a functional if statement.
   * @param {boolean} condition which decides whether to execute trueFunc or falseFunc.
   * @param {function} trueFunc which will be executed if condition is true.
   * @param {falseFunc} falseFunc which will be executed if condition is false.
   * @return {any} the result of trueFunc/ falseFunc.
   */
  doIfElse(condition, trueFunc, falseFunc) {
    let result;

    if (condition) {
      result = trueFunc.apply();
    } else {
      result = falseFunc.apply();
    }

    return result;
  },

  /**
   * Makes a string defined by an array, a separator, a prefixed string,
   * and a suffixed string.
   * @param {array} array the defined array of elements.
   * @param {string} separator the defined separator.
   * @param {string} before the defined prefixed string.
   * @param {string} after the defined suffixed string.
   * @return {string} a string representation of the defined parameters.
   */
  mkString(array, separator = ', ', before = '', after = '') {
    const result = array.reduce((concat, item, index) => {
      let newResult = concat;
      if (index > 0) {
        newResult = newResult + separator;
      }

      return newResult + item;
    }, before);

    return result + after;
  }
});
