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
