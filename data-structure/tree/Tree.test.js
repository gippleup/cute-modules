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
    myTree.children[3].insert('grandChild5');
    myTree.children[3].insert('grandChild6');
    myTree.children[3].insert('grandChild7');
    myTree.children[4].insert('grandChild8');
  });

  it('can add subTree', () => {
    expect(myTree.children[0].value).toBe('child1');
    expect(myTree.children[0].children[0].value).toBe('grandChild1');
  });

  it('can callback for each direct children', () => {
    const testingValue = [];
    myTree.forEachChildren((tree) => {
      testingValue.push(tree.value);
    });
    const expectedValue = ['child1', 'child2', 'child3', 'child4', 'child5'];
    expect(testingValue).toEqual(expectedValue);

  });

  it('can callback for each tree with depth-first search', () => {
    const testingValue = [];
    const expectedValue = ['origin',
      'child1', 'grandChild1', 'grandChild2',
      'child2', 'grandChild3',
      'child3', 'grandChild4',
      'child4', 'grandChild5', 'grandChild6', 'grandChild7',
      'child5', 'grandChild8',
    ];
    myTree.dfs((tree) => {
      testingValue.push(tree.value);
    });
    expect(testingValue).toEqual(expectedValue);
  });

  it('can callback for each tree with breadth-first search', () => {
    const testingValue = [];
    const expectedValue = ['origin',
      'child1', 'child2', 'child3', 'child4', 'child5',
      'grandChild1', 'grandChild2', 'grandChild3', 'grandChild4',
      'grandChild5', 'grandChild6', 'grandChild7', 'grandChild8',
    ];
    myTree.bfs((tree) => {
      testingValue.push(tree.value);
    });
    expect(testingValue).toEqual(expectedValue);
  });

  it('can map new tree', () => {
    const testingValue = [];
    const expectedValue = ['ori',
      'chi', 'chi', 'chi', 'chi', 'chi',
      'gra', 'gra', 'gra', 'gra',
      'gra', 'gra', 'gra', 'gra',
    ];
    const newTree = myTree.map((tree) => tree.value.slice(0, 3));
    newTree.bfs((tree) => {
      testingValue.push(tree.value);
    });
    expect(testingValue).toEqual(expectedValue);
  });

  it('can filter element', () => {
    const testingValue = [];
    const expectedValue = ['origin',
      'child1', 'child2', 'child3', 'child4', 'child5',
    ];
    const newTree = myTree.filter((tree) => tree.value[0] !== 'g');
    newTree.bfs((tree) => {
      testingValue.push(tree.value);
    });
    expect(testingValue).toEqual(expectedValue);
  });

  it('can perform reduce', () => {
    const testingValue = myTree.reduce((acc, tree) => {
      if (tree.value.indexOf('origin') > -1) {
        acc.origin += 1;
      } else if (tree.value.indexOf('child') > -1) {
        acc.child += 1;
      } else if (tree.value.indexOf('grandChild') > -1) {
        acc.grandChild += 1;
      }
      return acc;
    }, {
      origin: 0,
      child: 0,
      grandChild: 0,
    });
    const expectedValue = {
      origin: 1,
      child: 5,
      grandChild: 8,
    };
    expect(testingValue).toEqual(expectedValue);
  });

  afterAll(() => {
    delete global.myTree;
  });
});
