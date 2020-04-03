class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.count = 0;
  }

  insert(value) {
    const newTree = new Tree(value);
    this.children.push(newTree);
    this.count += 1;
  }

  dfs(callback) {
    callback(this);
    if (this.children[0]) {
      for (let i = 0; i < this.count; i += 1) {
        this.children[i].dfs(callback);
      }
    }
  }

  bfs(callback) {
    let curTree = this;
    const queue = [];
    while (queue[0]) {
      callback(curTree);
      if (curTree.children[0]) {
        for (let i = 0; i < curTree.count; i += 1) {
          queue.push(curTree.children[i]);
        }
      }
      curTree = queue.unshift();
    }
  }

  map(callback) {
    const newTree = new Tree(callback(this));
    if (this.children[0]) {
      for (let i = 0; i < this.count; i += 1) {
        this.addChild(this.children[i].map(callback));
      }
    }
    return newTree;
  }
}

module.exports = Tree;
