jest.dontMock('../../utils/constantsFactory');
jest.mock('../../utils/arrayUtil');

describe('constantsFactory', function() {
  it('creates an object with constants from a list of strings (array)', function() {
    const constantsFactory = require('../../utils/constantsFactory');
    const arrayUtil = require('../../utils/arrayUtil');
    arrayUtil.isArray.mockReturnValue(true);
    expect(constantsFactory([ 'A', 'B', 'C' ])).toEqual({
      A: 'A',
      B: 'B',
      C: 'C'
    });
  });

  it('creates an object with constants from list of strings (arguments)', function() {
    const constantsFactory = require('../../utils/constantsFactory');
    const arrayUtil = require('../../utils/arrayUtil');
    arrayUtil.isArray.mockReturnValue(false);
    expect(constantsFactory('A', 'B', 'C')).toEqual({
      A: 'A',
      B: 'B',
      C: 'C'
    });
  });
});
