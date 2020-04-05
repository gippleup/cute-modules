const Graph = require('./Graph');
const { log } = require('../../test-helper');

describe('Graph', () => {
  beforeEach(() => {
    /* global myGraph */
    global.myGraph = new Graph(5);
    myGraph.insert('vrtx1');
    myGraph.insert('vrtx2');
    myGraph.insert('vrtx3');
    myGraph.insert('vrtx4');
    myGraph.insert('vrtx5');
  });

  it('can insert nodes', () => {
    const testingValue = [
      myGraph.vertices.vrtx1.value,
      myGraph.vertices.vrtx2.value,
      myGraph.vertices.vrtx3.value,
      myGraph.vertices.vrtx4.value,
      myGraph.vertices.vrtx5.value,
    ];
    const expectedValue = ['vrtx1', 'vrtx2', 'vrtx3', 'vrtx4', 'vrtx5'];
    expect(testingValue).toEqual(expectedValue);
  });

  it('can add asymmetric edge', () => {
    myGraph.addEdge('vrtx1', 'vrtx2', false);
    expect(myGraph.vertices.vrtx1.containsOutNode('vrtx2')).toEqual(true);
    expect(myGraph.vertices.vrtx1.containsInNode('vrtx2')).toEqual(false);
    expect(myGraph.vertices.vrtx2.containsOutNode('vrtx1')).toEqual(false);
    expect(myGraph.vertices.vrtx2.containsInNode('vrtx1')).toEqual(true);
  });

  it('can add symmetric edge', () => {
    myGraph.addEdge('vrtx1', 'vrtx2');
    expect(myGraph.vertices.vrtx1.containsOutNode('vrtx2')).toEqual(true);
    expect(myGraph.vertices.vrtx1.containsInNode('vrtx2')).toEqual(true);
    expect(myGraph.vertices.vrtx2.containsOutNode('vrtx1')).toEqual(true);
    expect(myGraph.vertices.vrtx2.containsInNode('vrtx1')).toEqual(true);
  });

  it('can remove edge asymetrically', () => {
    myGraph.addEdge('vrtx1', 'vrtx2');
    myGraph.removeEdge('vrtx1', 'vrtx2', false);
    expect(myGraph.vertices.vrtx1.containsOutNode('vrtx2')).toEqual(false);
    expect(myGraph.vertices.vrtx1.containsInNode('vrtx2')).toEqual(false);
    expect(myGraph.vertices.vrtx2.containsOutNode('vrtx1')).toEqual(true);
    expect(myGraph.vertices.vrtx2.containsInNode('vrtx1')).toEqual(true);
  });

  it('can remove edge symetrically', () => {
    myGraph.addEdge('vrtx1', 'vrtx2');
    myGraph.removeEdge('vrtx1', 'vrtx2');
    expect(myGraph.vertices.vrtx1.containsOutNode('vrtx2')).toEqual(false);
    expect(myGraph.vertices.vrtx1.containsInNode('vrtx2')).toEqual(false);
    expect(myGraph.vertices.vrtx2.containsOutNode('vrtx1')).toEqual(false);
    expect(myGraph.vertices.vrtx2.containsInNode('vrtx1')).toEqual(false);
  });

  it('can callback for each vertex', () => {
    const testingValue = [];
    myGraph.forEachVertex((vrtx) => {
      testingValue.push(vrtx.value);
    });
    const expectedValue = [
      'vrtx1', 'vrtx2', 'vrtx3', 'vrtx4', 'vrtx5',
    ];
    expect(testingValue).toEqual(expectedValue);
  });

  it('can filter vertices and map new edges', () => {
    myGraph.addEdge('vrtx1', 'vrtx2');
    myGraph.addEdge('vrtx1', 'vrtx3');
    myGraph.addEdge('vrtx2', 'vrtx4');
    myGraph.addEdge('vrtx3', 'vrtx5');
    const filteredGraph = myGraph.filter((vrtx) => vrtx.key !== 'vrtx1');
    const expectedVertices = [
      'vrtx2', 'vrtx3', 'vrtx4', 'vrtx5',
    ];
    expect(filteredGraph.keys).toEqual(expectedVertices);
    expect(filteredGraph.vertices.vrtx2.contains('vrtx1')).toEqual(false);
    expect(filteredGraph.vertices.vrtx3.contains('vrtx1')).toEqual(false);
    expect(filteredGraph.vertices.vrtx3.contains('vrtx1')).toEqual(false);
  });

  afterAll(() => {
    delete global.myGraph;
  });
});
