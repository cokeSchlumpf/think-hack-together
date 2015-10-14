/**
 * Utility functions
 * @module listToMatrix
 */

/**
 * @constructor
 * @param {array} list - The subject to greet.
 * @param {number} elementsPerSubArray - The subject to greet.
 */
export default function(list, elementsPerSubArray) {
  let matrix = [];

  if (list) {
    let i;
    let k;

    for (i = 0, k = -1; i < list.length; i = i + 1) {
      if (i % elementsPerSubArray === 0) {
        k = k + 1;
        matrix[k] = [];
      }

      matrix[k].push(list[i]);
    }
  }

  return matrix;
}
