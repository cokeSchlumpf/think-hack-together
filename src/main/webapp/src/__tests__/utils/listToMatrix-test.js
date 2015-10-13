jest.dontMock('../../utils/listToMatrix');

describe('listToMatrix', function() {
  it('splits a list into a matrix', function() {
    const listToMatrix = require('../../utils/listToMatrix');
    expect(listToMatrix([ 1, 2, 3, 4 ], 2)).toEqual([ [ 1, 2 ], [ 3, 4 ] ]);
  });
});
