import ArrayUtil from './arrayUtil';

/**
 * Utility functions
 * @module constantsFactory;
 */

/**
 * Creates an object which serves constant values. E.g: { CONSTANT_1: "CONSTANT_1", CONSTANT_2: "CONSTANT_2" }
 *
 * @constructor
 * @param {array} constants List of strings for constants names.
 */
export default function(_constants) {
  let constants = _constants;
  if (!ArrayUtil.isArray(constants)) {
    constants = Object.keys(arguments).map(key => arguments[key]);
  }

  const result = {};
  constants.forEach(constant => {
    result[constant] = constant;
  });

  return result;
}
