const blankSquareArr = require('../../array-helper/blankSquareArr');
const Vertex = require('./Vertex.js');


class Graph {
  constructor(size) {
    this.vertices = {};
    this.edges = blankSquareArr(size);
    this.keys = [];
    this.count = 0;
    this.size = size;
  }

  insert(value, key, inLimit, outLimit) {
    const newNode = new Vertex(value, this.count, key, inLimit, outLimit);
    this.vertices[newNode.key] = newNode;
    this.keys.push(newNode.key);
    this.count += 1;
  }

  /**
   * @param {boolean} mutualEdge
   */
  addEdge(fromKey, toKey, mutualEdge = true) {
    const NodeO = this.vertices[fromKey];
    const NodeT = this.vertices[toKey];
    NodeO.addEdge(NodeT, mutualEdge);
    this.edges[NodeO.id][NodeT.id] = 1;
    if (mutualEdge) {
      this.edges[NodeT.id][NodeO.id] = 1;
    }
  }

  removeEdge(originKey, targetKey, mutualRemove = true) {
    const NodeO = this.vertices[originKey];
    const NodeT = this.vertices[targetKey];
    NodeO.removeEdges(NodeT, mutualRemove);
    this.edges[NodeO.id][NodeT.id] = 0;
    if (mutualRemove) {
      this.edges[NodeT.id][NodeO.id] = 0;
    }
  }

  forEachVertex(callback) {
    this.keys.forEach((key) => {
      callback(this.vertices[key]);
    });
  }

  contains(vrtxKey) {
    if (this.vertices[vrtxKey]) {
      return true;
    }
    return false;
  }

  filter(callback) {
    const collection = [];
    this.forEachVertex((vertex) => {
      if (callback(vertex)) {
        const edgeCollection = vertex.collectEdges((vrtx) => callback(vrtx));
        const vrtxCollection = {
          vertex,
          inVrtx: edgeCollection.inVrtx,
          outVrtx: edgeCollection.outVrtx,
        };
        collection.push(vrtxCollection);
      }
    });
    const newGraph = new Graph(collection.length);
    collection.forEach((vrtxSet) => {
      newGraph.insert(vrtxSet.vertex.value);
    });
    collection.forEach((vrtxSet) => {
      const originVrtx = vrtxSet.vertex;
      vrtxSet.inVrtx.forEach((inVrtx) => {
        newGraph.addEdge(inVrtx.key, originVrtx.key, false);
      });
      vrtxSet.outVrtx.forEach((outVrtx) => {
        newGraph.addEdge(originVrtx.key, outVrtx.key, false);
      });
    });
    return newGraph;
  }

  dfs(originKey, callback) {
    const originVrtx = this.vertices[originKey];
    originVrtx.dfs(callback);
  }

  bfs(originKey, callback) {
    const originVrtx = this.vertices[originKey];
    originVrtx.bfs(callback);
  }

  path(fromKey, toKey, dataType = 'vertex') {
    const originVrtx = this.vertices[fromKey];
    if (dataType === 'vertex') {
      return originVrtx.pathTo(toKey);
    } if (dataType === 'key') {
      return originVrtx.pathKeyArr(toKey);
    } if (dataType === 'value') {
      return originVrtx.pathValueArr(toKey);
    }
    throw new Error(`Requested unexpected data type: ${dataType}`);
  }

  mapPath(fromKey, toKey, callback) {
    const originVrtx = this.vertices[fromKey];
    const mappedPath = originVrtx.mapPath(toKey, (path) => callback(path));
    return mappedPath;
  }

  mapPathVrtx(fromKey, toKey, callback) {
    const originVrtx = this.vertices[fromKey];
    const mappedPath = originVrtx.mapPathVrtx(toKey, (vrtx) => callback(vrtx));
    return mappedPath;
  }

  filterPath(fromKey, toKey, callback) {
    const originVrtx = this.vertices[fromKey];
    const mappedPath = originVrtx.mapPath(toKey, (vrtx) => callback(vrtx));
    return mappedPath;
  }

  reducePath(fromKey, toKey, callback, init) {
    const originVrtx = this.vertices[fromKey];
    const reducedPath = originVrtx.reducePath(toKey, (acc, path) => callback(acc, path), init);
    return reducedPath;
  }

  shortestPath(fromKey, toKey) {
    const originVrtx = this.vertices[fromKey];
    const shortestPath = originVrtx.shortestPathTo(toKey);
    return shortestPath;
  }
}

module.exports = Graph;
