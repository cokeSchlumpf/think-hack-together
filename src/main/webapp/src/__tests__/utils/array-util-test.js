jest.dontMock('../../utils/array-util');

describe('arrayUtil.isArray', function() {
  it('returns false if you pass something else than an array', function() {
    const arrayUtil = require('../../utils/array-util');
    expect(arrayUtil.isArray('Hallo')).toEqual(false);
  });

  it('returns true if you pass something an array', function() {
    const arrayUtil = require('../../utils/array-util');
    expect(arrayUtil.isArray([ 1, 2, 3, 4 ])).toEqual(true);
  });
});

describe('arrayUtil.mkString', function() {
  it('returns true if the defined parameters used in mkString result in a correct string representation', function() {
    const arrayUtil = require('../../utils/array-util');
    expect(arrayUtil.mkString([ 1, 2, 3, 4 ], '|', 'prefix', 'suffix')).toEqual('prefix1|2|3|4suffix');
  });
});

describe('arrayUtil.fromString', function() {
  it('returns true if the defined parameters used in fromString result in a correct array representation', function() {
    const arrayUtil = require('../../utils/array-util');
    expect(arrayUtil.fromString('1, 2, 3, 4', ',')).toEqual([ '1', '2', '3', '4' ]);
  });
});
