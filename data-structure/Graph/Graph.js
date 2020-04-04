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

  filter(callback) {
    const newGraph = new Graph(this.size);
    this.forEachVertex((vrtx) => {
      if (callback(vrtx)) {
        newGraph.insert(vrtx.value);
      }
    });
    return newGraph;
  }
}

module.exports = Graph;
