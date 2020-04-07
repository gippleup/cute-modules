const ButtonGroup = require('./buttonGroup');
const DropDown = require('./dropdown');
const Row = require('./row');
const jsHelper = require('../../js-helper/helper-function');


jsHelper.repeat(10, (i) => {
  const newRow = new Row(i);
  newRow.col.forEach((col) => {
    col.style.textAlign = 'center';
    col.textContent = i;
  });
  newRow.appendTo(document.body);
});
