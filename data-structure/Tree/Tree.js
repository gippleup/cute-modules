const LinkedList = require('../linkedList/LinkedList');

class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.count = 0;
  }

  /**
   * @param {Tree} value if value is an instance of tree, push to this.children.
   * @param {any} value if value is not an instance of tree, make new tree and push.
   */
  insert(value) {
    const newTree = new Tree(value);
    this.children.push(newTree);
    this.count += 1;
  }

  forEachChildren(callback) {
    this.children.forEach((tree) => {
      callback(tree);
    });
  }

  /**
   * @param {boolean} skipHead;
   */
  dfs(callback) {
    callback(this);
    this.forEachChildren((tree) => {
      tree.dfs(callback);
    });
  }

  /**
   * @param {boolean} skipHead;
   */
  bfs(callback) {
    let curTree = this;
    const queue = new LinkedList();
    queue.insert(curTree);
    while (queue.head) {
      curTree = queue.removeHead().value; // node recieved tree as a value.
      callback(curTree);
      curTree.forEachChildren((tree) => {
        queue.insert(tree);
      });
    }
  }

  map(callback) {
    const newTree = new Tree(callback(this));
    this.forEachChildren((tree) => {
      newTree.children.push(tree.map(callback));
      newTree.count += 1;
    });
    return newTree;
  }

  filter(callback) {
    const newTree = new Tree();
    this.bfs((tree) => {
      if (callback(tree)) {
        if (!newTree.value) {
          newTree.value = tree.value;
        } else {
          newTree.insert(tree.value);
        }
      }
    });
    return newTree;
  }

  reduce(callback, initialValue) {
    let result = initialValue;
    this.bfs((tree) => {
      result = callback(result, tree);
    });
    return result;
  }
}

module.exports = Tree;
