const { inspect } = require('util');

function log(target, depth = 2) {
  // eslint-disable-next-line no-console
  console.log(inspect(target, {
    depth,
    showHidden: true,
    colors: true,
  }));
}

module.exports = {
  log,
};
