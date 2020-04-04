function blankSquareArr(size, defaultValue) {
  const newArr = Array(size);
  for (let i = 0; i < size; i += 1) {
    newArr[i] = Array(size);
    for (let j = 0; j < size; j += 1) {
      if (defaultValue) {
        newArr[i][j] = defaultValue;
      } else {
        newArr[i][j] = 0;
      }
    }
  }
  return newArr;
}

module.exports = blankSquareArr;
