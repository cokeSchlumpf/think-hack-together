jest.dontMock('../../utils/arrayUtil');

describe('arrayUtil.isArray', function() {
  it('returns false if you pass something else than an array', function() {
    const arrayUtil = require('../../utils/arrayUtil');
    expect(arrayUtil.isArray('Hallo')).toEqual(false);
  });

  it('returns true if you pass something an array', function() {
    const arrayUtil = require('../../utils/arrayUtil');
    expect(arrayUtil.isArray([ 1, 2, 3, 4 ])).toEqual(true);
  });
});
