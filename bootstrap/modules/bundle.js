(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../../js-helper/helper-function":5,"./buttonGroup":2,"./dropdown":3,"./row":4}],2:[function(require,module,exports){
class ButtonGroup {
  /**
   * @param {string} size lg/sm/''
   */
  constructor(size) {
    this.container = document.createElement('div');
    this.container.classList.add('btn-group');
    if (size) {
      this.container.classList.add(`btn-group-${size}`);
    }
  }

  addButton(name, event = 'click', callback) {
    const newButton = document.createElement('button');
    newButton.setAttribute('type', 'button');
    newButton.classList.add('btn', 'btn-primary');
    newButton.textContent = name;
    this.container.appendChild(newButton);
    if (typeof callback === 'function') {
      newButton.addEventListener(event, callback(newButton));
    }
  }

  /**
   * @param {HTMLElement} target
   */
  appendTo(target) {
    target.appendChild(this.container);
  }
}

module.exports = ButtonGroup;

},{}],3:[function(require,module,exports){
class Dropdown {
  constructor(des, id) {
    this.container = document.createElement('div');
    this.container.className = 'dropdown';
    this.button = document.createElement('button');
    this.button.setAttribute('type', 'button');
    this.button.setAttribute('data-toggle', 'dropdown');
    this.button.className = 'btn btn-primary dropdown-toggle';
    this.button.textContent = des;
    this.button.id = id;
    this.optionContainer = document.createElement('div');
    this.optionContainer.className = 'dropdown-menu';
    this.optionContainer.style.height = '200px';
    this.optionContainer.style.overflowY = 'scroll';
    this.container.appendChild(this.button);
    this.container.appendChild(this.optionContainer);
  }

  addOption(text, callback) {
    const newOption = document.createElement('a');
    newOption.className = 'dropdown-item';
    // newOption.href = '#';
    newOption.textContent = text;
    newOption.addEventListener('click', () => {
      if (typeof callback === 'function') {
        callback(newOption);
      }
      this.button.textContent = newOption.textContent;
    });
    this.optionContainer.appendChild(newOption);
  }

  appendTo(target) {
    target.appendChild(this.container);
  }
}

module.exports = Dropdown;

},{}],4:[function(require,module,exports){
class Row {
  constructor(colNum, size = 'md') {
    this.container = document.createElement('div');
    this.container.classList.add('row', `row-${size}`);
    this.col = [];
    this.colCount = 0;
    for (let i = 0; i < colNum; i += 1) {
      this.addCol();
    }
  }

  get length() {
    return this.colCount;
  }

  addCol(size = '') {
    const newCol = document.createElement('div');
    newCol.classList.add('col', `col-${size}`);
    this.container.appendChild(newCol);
    this.col.push(newCol);
    this.colCount += 1;
  }

  appendTo(target) {
    target.appendChild(this.container);
  }
}

module.exports = Row;

},{}],5:[function(require,module,exports){
const jsHelper = {
  repeat(repeatNum, callback) {
    for (let i = 0; i < repeatNum; i += 1) {
      callback(i);
    }
  },
};

module.exports = jsHelper;

},{}]},{},[2,3,1]);
