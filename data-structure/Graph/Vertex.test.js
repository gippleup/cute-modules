const Vertex = require('./Vertex');
const { log } = require('../../test-helper');

describe('Vertex', () => {
  beforeEach(() => {
    /* global vertex1, vertex2, vertex3, vertex4, vertex5 */
    global.vertex1 = new Vertex('vrtx1');
    global.vertex2 = new Vertex('vrtx2');
    global.vertex3 = new Vertex('vrtx3');
    global.vertex4 = new Vertex('vrtx4');
    global.vertex5 = new Vertex('vrtx5');
  });

  it('can connect one-direction', () => {
    vertex1.addEdge(vertex2, false);
    expect(vertex1.containsOutNode('vrtx2')).toEqual(true);
    expect(vertex2.containsInNode('vrtx1')).toEqual(true);
    expect(vertex1.containsInNode('vrtx2')).toEqual(false);
    expect(vertex2.containsOutNode('vrtx1')).toEqual(false);
  });

  it('can connect to each other', () => {
    vertex1.addEdge(vertex2);
    expect(vertex1.containsOutNode('vrtx2')).toEqual(true);
    expect(vertex2.containsInNode('vrtx1')).toEqual(true);
    expect(vertex1.containsInNode('vrtx2')).toEqual(true);
    expect(vertex2.containsOutNode('vrtx1')).toEqual(true);
  });

  it('can remove edge', () => {
    vertex1.addEdge(vertex2);
    vertex1.addEdge(vertex3);
    vertex1.removeEdges(vertex2);
    expect(vertex1.contains('vrtx2')).toEqual(false);
    expect(vertex1.contains('vrtx3')).toEqual(true);
  });

  it('can filter edges(1)', () => {
    vertex1.addEdge(vertex2);
    vertex1.addEdge(vertex3);
    vertex1.addEdge(vertex4);
    vertex1.addEdge(vertex5);
    const newVrtx1 = vertex1.filterEdges((vrtx) => vrtx.key !== 'vrtx4');
    expect(newVrtx1.contains('vrtx4')).toEqual(false);
  });

  it('can filter edges(2)', () => {
    vertex1.addEdge(vertex2);
    vertex1.addEdge(vertex3);
    vertex1.addEdge(vertex4);
    vertex1.addEdge(vertex5);
    const newVrtx1 = vertex1.filterEdges((vrtx) => parseInt(vrtx.key.match(/\d+/g)[0], 10) < 4);
    expect(newVrtx1.contains('vrtx2')).toEqual(true);
    expect(newVrtx1.contains('vrtx3')).toEqual(true);
    expect(newVrtx1.contains('vrtx4')).toEqual(false);
    expect(newVrtx1.contains('vrtx5')).toEqual(false);
  });

  it('can collect edges', () => {
    vertex1.addEdge(vertex2);
    vertex1.addEdge(vertex3);
    vertex1.addEdge(vertex4);
    vertex1.addEdge(vertex5);
    const collection = vertex1.collectEdges((vrtx) => parseInt(vrtx.key.match(/\d+/g)[0], 10) < 4);
    expect(collection.inVrtx.length).toEqual(2);
    expect(collection.inVrtx[0]).toEqual(vertex2);
    expect(collection.inVrtx[1]).toEqual(vertex3);
  });

  it('can perform depth-first-search', () => {
    vertex1.addEdge(vertex2);
    vertex1.addEdge(vertex3);
    vertex2.addEdge(vertex4);
    vertex2.addEdge(vertex5);
    const testingValue = [];
    vertex1.dfs((vrtx) => {
      testingValue.push(vrtx.value);
    });
    const expectedValue = [
      'vrtx1', 'vrtx3', 'vrtx2', 'vrtx5', 'vrtx4',
    ];
    expect(testingValue).toEqual(expectedValue);
  });

  it('can perfrom breadth-first search', () => {
    vertex1.addEdge(vertex2);
    vertex1.addEdge(vertex3);
    vertex2.addEdge(vertex4);
    vertex2.addEdge(vertex5);
    const testingValue = [];
    vertex1.bfs((vrtx) => {
      testingValue.push(vrtx.value);
    });
    const expectedValue = [
      'vrtx1', 'vrtx2', 'vrtx3', 'vrtx4', 'vrtx5',
    ];
    expect(testingValue).toEqual(expectedValue);
  });

  it('can find paths to target node with target key(1) - two-direction', () => {
    vertex1.addEdge(vertex2);
    vertex1.addEdge(vertex3);
    vertex2.addEdge(vertex4);
    vertex2.addEdge(vertex3);
    vertex3.addEdge(vertex4);
    vertex3.addEdge(vertex5);
    const vertexPathArr = vertex1.pathTo('vrtx5');
    const testingValue = [];
    vertexPathArr.forEach((path) => {
      testingValue.push(path.reduce((result, vrtx) => {
        result.push(vrtx.key);
        return result;
      }, []));
    });
    const expectedValue = [
      ['vrtx1', 'vrtx2', 'vrtx4', 'vrtx3', 'vrtx5'],
      ['vrtx1', 'vrtx2', 'vrtx3', 'vrtx5'],
      ['vrtx1', 'vrtx3', 'vrtx5'],
    ];
    expect(testingValue).toEqual(expectedValue);
  });

  it('can find paths to target node with target key(2) - one-direction', () => {
    vertex1.addOutEdge(vertex2);
    vertex1.addOutEdge(vertex3);
    vertex2.addOutEdge(vertex4);
    vertex2.addOutEdge(vertex3);
    vertex3.addOutEdge(vertex4);
    vertex3.addOutEdge(vertex5);
    const vertexPathArr = vertex1.pathTo('vrtx5');
    const testingValue = [];
    vertexPathArr.forEach((path) => {
      testingValue.push(path.reduce((result, vrtx) => {
        result.push(vrtx.key);
        return result;
      }, []));
    });
    const expectedValue = [
      ['vrtx1', 'vrtx2', 'vrtx3', 'vrtx5'],
      ['vrtx1', 'vrtx3', 'vrtx5'],
    ];
    expect(testingValue).toEqual(expectedValue);
  });

  it('can map new pathArr from vertex pathArr', () => {
    vertex1.addEdge(vertex2);
    vertex1.addEdge(vertex3);
    vertex2.addEdge(vertex4);
    vertex2.addEdge(vertex3);
    vertex3.addEdge(vertex4);
    vertex3.addEdge(vertex5);
    const testingValue = vertex1.mapPath('vrtx5', (vrtx) => vrtx.key);
    const expectedValue = [
      ['vrtx1', 'vrtx2', 'vrtx4', 'vrtx3', 'vrtx5'],
      ['vrtx1', 'vrtx2', 'vrtx3', 'vrtx5'],
      ['vrtx1', 'vrtx3', 'vrtx5'],
    ];
    expect(testingValue).toEqual(expectedValue);
  });

  it('can get vertex key array for each path', () => {
    vertex1.addEdge(vertex2);
    vertex1.addEdge(vertex3);
    vertex2.addEdge(vertex4);
    vertex2.addEdge(vertex3);
    vertex3.addEdge(vertex4);
    vertex3.addEdge(vertex5);
    const testingValue = vertex1.pathKeyArr('vrtx5');
    const expectedValue = [
      ['vrtx1', 'vrtx2', 'vrtx4', 'vrtx3', 'vrtx5'],
      ['vrtx1', 'vrtx2', 'vrtx3', 'vrtx5'],
      ['vrtx1', 'vrtx3', 'vrtx5'],
    ];
    expect(testingValue).toEqual(expectedValue);
  });

  afterAll(() => {
    delete global.vertex1;
    delete global.vertex2;
    delete global.vertex3;
    delete global.vertex4;
    delete global.vertex5;
  });
});
