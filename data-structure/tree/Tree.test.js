const Tree = require('./Tree');

describe('Tree', () => {
  beforeEach(() => {
    /* global myTree */
    global.myTree = new Tree('origin');
    myTree.insert('child1');
    myTree.insert('child2');
    myTree.insert('child3');
    myTree.insert('child4');
    myTree.insert('child5');
    myTree.children[0].insert('grandChild1');
    myTree.children[0].insert('grandChild2');
    myTree.children[1].insert('grandChild3');
    myTree.children[2].insert('grandChild4');
    myTree.children[3].insert('grandChild4');
    myTree.children[3].insert('grandChild5');
    myTree.children[3].insert('grandChild6');
    myTree.children[4].insert('grandChild7');
  });

  it('can add subTree', () => {
    expect(myTree.children[0].value).toBe('child1');
    expect(myTree.children[0].children[0].value).toBe('grandChild1');
  });

  it('can callback for each tree with depth-first search', () => {
    const testingValue = [];
    const allElement = ['origin',
      'child1', 'grandChild1', 'grandChild2',
      'child2', 'grandChild3',
      'child3', 'grandChild4',
      'child4', 'grandChild4', 'grandChild5', 'grandChild6',
      'child5', 'grandChild7'];
    myTree.dfs((tree) => {
      testingValue.push(tree.value);
    });
    expect(testingValue).toEqual(allElement);
  });

  it('can callback for each tree with broadth-first search', () => {
    const testingValue = [];
    const allElement = ['origin',
      'child1', 'child2', 'child2', 'child3', 'child4', 'child5',
      'grandChild1', 'grandChild2', 'grandChild3', 'grandChild4',
      'grandChild5', 'grandChild6', 'grandChild7',
    ];
    myTree.bfs((tree) => {
      testingValue.push(tree.value);
    });
    expect(testingValue).toEqual(allElement);
  });


  afterAll(() => {
    delete global.myTree;
  });
});
