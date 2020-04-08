const jsHelper = {
  repeat(repeatNum, callback) {
    for (let i = 0; i < repeatNum; i += 1) {
      callback(i);
    }
  },
};

module.exports = jsHelper;
