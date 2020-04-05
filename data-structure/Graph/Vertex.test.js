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

  afterAll(() => {
    delete global.vertext1;
    delete global.vertext2;
  });
});
