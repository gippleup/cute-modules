const Queue = require('./Queue');

describe('Queue', () => {

  beforeEach(() => {
    /* global myQueue */
    global.myQueue = new Queue();
    myQueue.enqueue(1);
    myQueue.enqueue(2);
    myQueue.enqueue(3);
    myQueue.enqueue(4);
    myQueue.enqueue(5);
  });

  it('can enqueue items', () => {
    expect(myQueue.contains(1)).toEqual(true);
    expect(myQueue.contains(2)).toEqual(true);
    expect(myQueue.contains(3)).toEqual(true);
    expect(myQueue.contains(4)).toEqual(true);
    expect(myQueue.contains(5)).toEqual(true);
  });

  it('can dequeue items', () => {
    expect(myQueue.dequeue()).toEqual(1);
    expect(myQueue.dequeue()).toEqual(2);
    expect(myQueue.dequeue()).toEqual(3);
    expect(myQueue.dequeue()).toEqual(4);
    expect(myQueue.dequeue()).toEqual(5);
  });

  afterAll(() => {
    delete global.myQueue;
  });
})