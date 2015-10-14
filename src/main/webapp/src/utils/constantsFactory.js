/**
 * Utility functions
 * @module listToMatrix
 */

/**
 * Creates an object which serves constant values. E.g: { CONSTANT_1: "CONSTANT_1", CONSTANT_2: "CONSTANT_2" }
 *
 * @constructor
 * @param {array} constants List of strings for constants names.
 */
export default function(constants) {
  const result = {};
  for (constant of constants) {
    result[constant] = constant;
  }
  return result;
}
