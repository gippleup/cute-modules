function LinkNode(value) {
  this.value = value;
  this.next = null;
  this.previous = null;
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insert(value) {
    const newTail = new LinkNode(value);
    if (!this.head) {
      this.head = newTail;
      this.tail = newTail;
    } else {
      newTail.previous = this.tail;
      this.tail.next = newTail;
      this.tail = newTail;
    }
  }

  removeHead() {
    const result = this.head;
    if (this.head) {
      this.head = this.head.next;
    }
    return result;
  }

  removeTail() {
    const result = this.tail;
    if (this.tail) {
      this.tail = this.tail.previous;
    }
    return result;
  }

  forEachNode(callback) {
    let curNode = this.head;
    callback(curNode);
    while (curNode.next) {
      curNode = curNode.next;
      callback(curNode);
    }
  }

  map(callback) {
    const newLinkedList = new LinkedList();
    this.forEachNode((node) => {
      newLinkedList.insert(callback(node));
    });
    return newLinkedList;
  }

  filter(callback) {
    const newLinkedList = new LinkedList();
    this.forEachNode((node) => {
      const result = callback(node);
      if (result) {
        newLinkedList.insert(node.value);
      }
    });
    return newLinkedList;
  }

  reduce(callback, initialValue) {
    let result = initialValue;
    this.forEachNode((node) => {
      result = callback(result, node);
    });
    return result;
  }
}

module.exports = LinkedList;
