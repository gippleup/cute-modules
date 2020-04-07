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
