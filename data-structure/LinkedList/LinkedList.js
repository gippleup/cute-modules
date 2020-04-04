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
      // console.log(value);
      this.head = newTail;
      this.tail = newTail;
    } else {
      // console.log(value);
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
    if (!curNode) {
      return;
    }
    callback(curNode);
    while (curNode.next) {
      curNode = curNode.next;
      const result = callback(curNode);
      if (result === 'stopLoop') {
        return;
      }
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
      if (callback(node)) {
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

  contains(filter) {
    let result = false;

    function action() {
      result = true;
    }

    this.forEachNode((node) => {
      if (typeof filter === 'function') {
        if (filter(node)) {
          action();
          return 'stopLoop';
        }
      } else if (node.value === filter) {
        action();
        return 'stopLoop';
      }
      return false;
    });
    return result;
  }

  remove(filter) {
    let removedNode = null;

    function action(node) {
      removedNode = node;
      const prevNode = node.previous;
      const target = node;
      if (prevNode) {
        prevNode.next = target.next;
      } else {
        this.head = target.next;
      }
    }

    this.forEachNode((node) => {
      if (typeof filter === 'function') {
        if (filter(node)) {
          action.call(this, node);
          return 'stopLoop';
        }
      } else if (node.value === filter) {
        action.call(this, node);
        return 'stopLoop';
      }
      return false;
    });
    return removedNode;
  }
}

module.exports = LinkedList;
