const LinkedList = require('../LinkedList/LinkedList');
const Queue = require('../Queue/Queue');

class Vertex {
  constructor(value, id, key, inLimit, outLimit) {
    this.id = id;
    this.key = key || value;
    this.value = value;
    this.limit = {
      inLimit: Infinity || inLimit,
      outLimit: Infinity || outLimit,
    };
    this.count = {
      inDegree: 0,
      outDegree: 0,
    };
    this.edges = {
      from: new LinkedList(),
      to: new LinkedList(),
    };
  }

  /**
   * @param {Vertex} vrtxTo
   */
  addEdge(vrtxTo, mutualEdge = true) {
    this.addOutEdge(vrtxTo);
    vrtxTo.addInEdge(this);
    if (mutualEdge) {
      this.addInEdge(vrtxTo);
      vrtxTo.addOutEdge(this);
    }
  }

  /**
   * @param {Vertex} vrtxFrom;
   */
  addInEdge(vrtxFrom) {
    const targetVrtx = vrtxFrom;
    if (this.count.inDegree < this.limit.inLimit) {
      this.edges.from.insert(targetVrtx);
      this.count.inDegree += 1;
    } else {
      throw new Error(`the in-degree of ${this.key} has exceeded its limit`);
    }
  }

  /**
   * @param {Vertex} vrtxTo;
   */
  addOutEdge(vrtxTo) {
    const targetVrtx = vrtxTo;
    if (this.count.outDegree < this.limit.outLimit) {
      this.edges.to.insert(targetVrtx);
      this.count.outDegree += 1;
    } else {
      throw new Error(`the out-degree of ${this.key} has exceeded its limit`);
    }
  }

  removeEdges(removingNode, mutualRemove = true) {
    const target = removingNode;
    this.count.inDegree -= 1;
    this.count.outDegree -= 1;
    this.removeInEdge(target.key);
    this.removeOutEdge(target.key);
    if (mutualRemove) {
      target.count.inDegree -= 1;
      target.count.outDegree -= 1;
      target.removeInEdge(this.key);
      target.removeOutEdge(this.key);
    }
  }

  removeInEdge(targetKey) {
    this.count.inDegree -= 1;
    return this.edges.from.remove((node) => node.value.key === targetKey);
  }

  removeOutEdge(targetKey) {
    this.count.outDegree -= 1;
    return this.edges.to.remove((node) => node.value.key === targetKey);
  }

  contains(vrtxKey) {
    return this.containsInNode(vrtxKey)
    || this.containsOutNode(vrtxKey);
  }

  containsInNode(vrtxKey) {
    return this.edges.from.contains((node) => node.value.key === vrtxKey);
  }

  containsOutNode(vrtxKey) {
    return this.edges.to.contains((node) => node.value.key === vrtxKey);
  }

  filterEdges(callback) {
    const newVrtx = new Vertex(
      this.value, this.id, this.key, this.limit.inLimit, this.limit.outLimit,
    );
    const filteredInVrtx = this.edges.from.filter((node) => callback(node.value));
    const filteredOutVrtx = this.edges.to.filter((node) => callback(node.value));
    filteredInVrtx.forEachNode((node) => {
      newVrtx.addInEdge(node.value);
    });
    filteredOutVrtx.forEachNode((node) => {
      newVrtx.addOutEdge(node.value);
    });
    return newVrtx;
  }

  collectEdges(callback) {
    function reducer(acc, node) {
      if (callback(node.value)) {
        acc.push(node.value);
      }
      return acc;
    }
    const inVrtx = this.edges.from.reduce((acc, node) => reducer(acc, node), []);
    const outVrtx = this.edges.from.reduce((acc, node) => reducer(acc, node), []);
    return {
      inVrtx,
      outVrtx,
    };
  }

  /**
   * @param {string} type 'to' or 'from'
   */
  forEachEdge(type, callback) {
    this.edges[type].forEachNode((node) => {
      callback(node.value);
    });
  }

  dfs(callback) {
    const stack = [];
    const hasChecked = {};
    let curVrtx = this;
    stack.push(curVrtx);
    hasChecked[curVrtx.key] = true;

    function search() {
      curVrtx = stack.pop();
      callback(curVrtx);
      curVrtx.forEachEdge('to', (vrtx) => {
        if (!hasChecked[vrtx.key]) {
          stack.push(vrtx);
          hasChecked[vrtx.key] = true;
        }
      });
    }

    while (stack.length) {
      search();
    }
  }

  bfs(callback) {
    const queue = new Queue();
    const hasChecked = {};
    let curVrtx = this;
    queue.enqueue(curVrtx);
    hasChecked[curVrtx.key] = true;

    function search() {
      curVrtx = queue.dequeue();
      callback(curVrtx);
      curVrtx.forEachEdge('to', (vrtx) => {
        if (!hasChecked[vrtx.key]) {
          queue.enqueue(vrtx);
          hasChecked[vrtx.key] = true;
        }
      });
    }

    while (queue.count > 0) {
      search();
    }
  }

  pathTo(trgtKey) {
    const pathArr = [];
    const initialPath = [this];
    const initialCheckList = {};
    initialCheckList[this.key] = true;
    function addPath(vertex, path = [], checkList = {}) {
      if (vertex.key !== trgtKey) {
        vertex.forEachEdge('to', (vrtx) => {
          if (!checkList[vrtx.key]) {
            const newPath = path.slice();
            const newCheckList = Object.create(checkList);
            newPath.push(vrtx);
            newCheckList[vrtx.key] = true;
            addPath(vrtx, newPath, newCheckList);
          }
        });
      } else {
        pathArr.push(path);
      }
    }

    addPath(this, initialPath, initialCheckList);

    return pathArr;
  }

  mapPath(trgtKey, callback) {
    const pathArr = this.pathTo(trgtKey);
    const mappedArr = pathArr.map((path) => callback(path));
    return mappedArr;
  }

  mapPathVrtx(trgtKey, callback) {
    const pathArr = this.pathTo(trgtKey);
    const mappedArr = pathArr.map((path) => path.map((vrtx) => callback(vrtx)));
    return mappedArr;
  }

  pathKeyArr(trgtKey) {
    return this.mapPathVrtx(trgtKey, (vrtx) => vrtx.key);
  }

  pathValueArr(trgtKey) {
    return this.mapPathVrtx(trgtKey, (vrtx) => vrtx.value);
  }

  filterPath(trgtKey, callback) {
    const pathArr = this.pathTo(trgtKey);
    const filteredPath = pathArr.filter((path) => callback(path));
    return filteredPath;
  }

  reducePath(trgtKey, callback, initialValue) {
    const pathArr = this.pathTo(trgtKey);
    let init = initialValue;
    if (initialValue === undefined) {
      [init] = pathArr;
    }
    const reducedPath = pathArr.reduce((acc, path) => {
      let newAcc = acc;
      newAcc = callback(acc, path);
      return newAcc;
    }, init);
    return reducedPath;
  }

  shortestPathTo(trgtKey) {
    const pathArr = this.pathTo(trgtKey);
    let minLength = Infinity;
    let minPath = [];
    for (let i = 0; i < pathArr.length; i += 1) {
      if (pathArr[i].length < minLength) {
        minPath = pathArr[i];
        minLength = pathArr[i].length;
      }
    }
    return minPath;
  }
}

module.exports = Vertex;
