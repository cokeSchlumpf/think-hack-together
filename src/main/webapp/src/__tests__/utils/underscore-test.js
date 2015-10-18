jest.dontMock('../../utils/underscore');
// We do not mock underscore at all since we extend from it.
jest.dontMock('underscore');

describe('_.arrayFromString', function() {
  it('returns true if the defined parameters used in fromString result in a correct array representation', function() {
    const _ = require('../../utils/underscore');
    expect(_.arrayFromString('1, 2, 3, 4', ',')).toEqual([ '1', '2', '3', '4' ]);
  });
});

describe('_.arrayToMatrix', function() {
  it('returns a 2-dimensional matrix from an array', function() {
    const _ = require('../../utils/underscore');
    expect(_.arrayToMatrix([ '1', '2', '3', '4' ], 2)).toEqual([ [ '1', '2' ], [ '3', '4' ] ]);
  });
});

describe('_.check', function() {
  it('throws an error if checks are failing.', function() {
    const _ = require('../../utils/underscore');
    expect(_.check({
      isEqual: [ [ 'a', 'a' ] ]
    })).toEqual(true);

    expect(function() {
      _.check({
        isFunction: [ [ 'a' ] ]
      });
    }).toThrow();
  });
});

describe('_.constantsFromArray', function() {
  it('creates an object with constants from a list of strings (array)', function() {
    const _ = require('../../utils/underscore');

    _.isArray = jest.genMockFunction();
    _.isArray.mockReturnValue(true);

    expect(_.constantsFromArray([ 'A', 'B', 'C' ])).toEqual({
      A: 'A',
      B: 'B',
      C: 'C'
    });
  });
});

describe('_.constantsFromArray', function() {
  it('creates an object with constants from a list of strings (arguments)', function() {
    const _ = require('../../utils/underscore');

    _.isArray = jest.genMockFunction();
    _.isArray.mockReturnValue(false);

    expect(_.constantsFromArray('A', 'B', 'C')).toEqual({
      A: 'A',
      B: 'B',
      C: 'C'
    });
  });
});

describe('_.constantsFromArray', function() {
  it('creates an object with constants from a list of strings (array) with prefix', function() {
    const _ = require('../../utils/underscore');

    _.isArray = jest.genMockFunction();
    _.isArray.mockReturnValue(false);

    expect(_.constantsFromArray([ 'A', 'B', 'C' ], 'PREFIX_')).toEqual({
      PREFIX_A: 'PREFIX_A',
      PREFIX_B: 'PREFIX_B',
      PREFIX_C: 'PREFIX_C'
    });
  });
});

describe('_.isNonEmptyString', function() {
  it('returns true if given object is a string and not empty.', function() {
    const _ = require('../../utils/underscore');
    expect(_.isNonEmptyString('aaa')).toEqual(true);
    expect(_.isNonEmptyString([ 'a' ])).toEqual(false);
    expect(_.isNonEmptyString('')).toEqual(false);
  });
});

describe('_.mkString', function() {
  it('returns true if the defined parameters used in mkString result in a correct string representation', function() {
    const _ = require('../../utils/underscore');
    expect(_.mkString([ 1, 2, 3, 4 ], '|', 'prefix', 'suffix')).toEqual('prefix1|2|3|4suffix');
  });
});

describe('_.orElse', function() {
  it('returns the value if it is undefined, otherwise it will return elseValue.', function() {
    const _ = require('../../utils/underscore');
    // expect(_.orElse(undefined, 'a')).toEqual('a');
    expect(_.orElse('a', 'b')).toEqual('a');
  });
});
