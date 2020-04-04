const LinkedList = require('./LinkedList');

describe('LinkedList', () => {
  beforeEach(() => {
    /* global myLinkedList */
    global.myLinkedList = new LinkedList();
    myLinkedList.insert('head');
    myLinkedList.insert('body1');
    myLinkedList.insert('body2');
    myLinkedList.insert('body3');
    myLinkedList.insert('body4');
    myLinkedList.insert('tail');
  });

  it('can add nodes', () => {
    let curNode = myLinkedList.head;
    expect(curNode.value).toEqual('head');
    curNode = curNode.next;
    expect(curNode.value).toEqual('body1');
    curNode = curNode.next;
    expect(curNode.value).toEqual('body2');
    curNode = curNode.next;
    expect(curNode.value).toEqual('body3');
    curNode = curNode.next;
    expect(curNode.value).toEqual('body4');
    curNode = curNode.next;
    expect(curNode.value).toEqual('tail');
  });

  it('can remove head', () => {
    expect(myLinkedList.removeHead().value).toEqual('head');
    expect(myLinkedList.removeHead().value).toEqual('body1');
    expect(myLinkedList.removeHead().value).toEqual('body2');
    expect(myLinkedList.removeHead().value).toEqual('body3');
  });

  it('can remove tail', () => {
    expect(myLinkedList.removeTail().value).toEqual('tail');
    expect(myLinkedList.removeTail().value).toEqual('body4');
    expect(myLinkedList.removeTail().value).toEqual('body3');
    expect(myLinkedList.removeTail().value).toEqual('body2');
  });

  it('can callback for each node', () => {
    const result = [];
    myLinkedList.forEachNode((node) => {
      result.push(node.value);
    });
    const nodeList = ['head', 'body1', 'body2', 'body3', 'body4', 'tail'];
    expect(result).toEqual(nodeList);
  });

  it('can perform mapping', () => {
    const newList = myLinkedList.map((node) => node.value[node.value.length - 1]);
    const newValues = [];
    newList.forEachNode((node) => {
      newValues.push(node.value);
    });
    const expectedValue = ['d', '1', '2', '3', '4', 'l'];
    expect(newValues).toEqual(expectedValue);
  });

  it('can perform filter', () => {
    const newList = myLinkedList.filter((node) => node.value[0] === 'b');
    const newValues = [];
    newList.forEachNode((node) => {
      newValues.push(node.value);
    });
    const expectedValue = ['body1', 'body2', 'body3', 'body4'];
    expect(newValues).toEqual(expectedValue);
  });

  it('can perform reduce', () => {
    const newValues = myLinkedList.reduce((acc, node) => {
      const prevAcc = acc;
      const newAcc = prevAcc + node.value.length;
      return newAcc;
    }, 0);
    const expectedValue = 28;
    expect(newValues).toEqual(expectedValue);
  });

  it('can perform contains method by variable', () => {
    expect(myLinkedList.contains('body3')).toEqual(true);
  });

  it('can perform contains method by function', () => {
    expect(myLinkedList.contains((node) => node.value === 'body3')).toEqual(true);
  });

  it('can remove node', () => {
    myLinkedList.remove('body3');
    expect(myLinkedList.contains('body3')).toEqual(false);
  });
});
