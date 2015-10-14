jest.dontMock('../../utils/constantsFactory');

describe('constantsFactory', function() {
  it('creates an object with constants from a list of strings', function() {
    const constantsFactory = require('../../utils/constantsFactory');
    expect(constantsFactory([ 'A', 'B', 'C' ])).toEqual({
      A: 'A',
      B: 'B',
      C: 'C'
    });
  });
});
