const LinkedList = require('../LinkedList/LinkedList');

class Queue extends LinkedList {
  constructor() {
    super();
    this.count = 0;
  }

  enqueue(value) {
    this.insert(value);
    this.count += 1;
  }

  dequeue() {
    if (this.count > 0) {
      this.count -= 1;
      return this.removeHead().value;
    }
    return false;
  }
}

module.exports = Queue;
