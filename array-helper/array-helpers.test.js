const blankSquareArr = require('./blankSquareArr');

describe('blankSqaureArray', () => {
  it('can create two dimensional array', () => {
    const mySquare = blankSquareArr(4, 0);
    const expectedResult = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    expect(mySquare).toEqual(expectedResult);
  });
});
