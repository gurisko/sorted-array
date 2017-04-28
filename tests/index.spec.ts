import 'mocha';
import { assert } from 'chai';
import { SortedArray } from '../src';

describe('SortedArray', () => {
  let arr = new SortedArray();

  beforeEach(() => {
    arr = new SortedArray();
  });

  describe('#length', () => {
    it('exists', () => {
      assert.equal(arr.length, 0);
    });
  })

  describe('toArray', () => {
    it('converts to an array', () => {
      const result = arr.toArray();
      assert.equal(Array.isArray(result), true);
      assert.deepEqual(result, []);
    });
  });

  describe('clear', () => {
    it('clears content', () => {
      arr.insert([0, 5, 10]);
      assert.deepEqual(arr.clear().toArray(), []);
    });
  });

  describe('insert', () => {
    it('adds a number', () => {
      assert.equal(arr.length, 0);
      arr.insert(0);
      assert.equal(arr.length, 1);
    });

    it('adds multiple numbers', () => {
      arr.insert(10, 0, 5);
      assert.equal(arr.length, 3);
    });

    it('adds an array', () => {
      arr.insert([10, 0, 5]);
      assert.equal(arr.length, 3);
    });

    it('multiple inserts', () => {
      arr.insert(10);
      arr.insert(0);
      arr.insert(5);
      assert.equal(arr.length, 3);
    });

    it('sorts numbers correctly', () => {
      arr.insert([50, -50, 0]);
      arr.insert([-25, 25]);
      assert.deepEqual(arr.toArray(), [-50, -25, 0, 25, 50]);
    });

    it('sorts strings correctly', () => {
      arr.insert(['y', 'z']);
      arr.insert('x');
      assert.deepEqual(arr.toArray(), ['x', 'y', 'z']);
    });
  });

  describe('get', () => {
    it('returns correct indexes', () => {
      arr.insert([0, 5, 10]);

      assert.equal(arr.get(0), 0);
      assert.equal(arr.get(1), 5);
      assert.equal(arr.get(2), 10);
      assert.equal(arr.get(3), undefined);
    });
  });

  describe('search', () => {
    it('returns -1 when element not found', () => {
      arr.insert([0, 5, 10]);
      assert.equal(arr.search(2), -1);
    });

    it('returns correct index', () => {
      arr.insert([0, 5, 5, 5, 10]);
      assert.equal(arr.search(0), 0);
      assert.equal(arr.search(5), 1);
      assert.equal(arr.search(10), 4);
    });
  });

  describe('remove', () => {
    it('removes an element', () => {
      arr.insert([0, 5, 10]);
      arr.remove(0);
      assert.deepEqual(arr.toArray(), [5, 10]);

      arr.remove(arr.length - 1);
      assert.deepEqual(arr.toArray(), [5]);

      arr.remove(0);
      assert.equal(arr.length, 0);
      assert.deepEqual(arr.toArray(), []);
    });

    it('removes multiple elements', () => {
      arr.insert([0, 5, 10]);
      arr.remove(0, 2);
      assert.deepEqual(arr.toArray(), [10]);
    });
  });

  describe('removeByValue', () => {
    it('removes multiple elements', () => {
      arr.insert([0, 5, 5, 10]);
      assert.deepEqual(arr.removeByValue(5).toArray(), [0, 10]);
    });
  });

  describe('gt', () => {
    it('returns empty array', () => {
      assert.deepEqual(arr.gt(0).toArray(), []);
    });
    it('returns correct result', () => {
      arr.insert([0, 5, 5, 10]);
      assert.deepEqual(arr.gt(4).toArray(), [5, 5, 10]);
      assert.deepEqual(arr.gt(0).toArray(), [5, 5, 10]);
    });
  });

  describe('gte', () => {
    it('returns empty array', () => {
      assert.deepEqual(arr.gt(0).toArray(), []);
    });
    it('returns correct result', () => {
      arr.insert([0, 5, 5, 10]);
      assert.deepEqual(arr.gte(10).toArray(), [10]);
      assert.deepEqual(arr.gte(5).toArray(), [5, 5, 10]);
      assert.deepEqual(arr.gte(0).toArray(), [0, 5, 5, 10]);
    });
  });

  describe('lt', () => {
    it('returns empty array', () => {
      assert.deepEqual(arr.lt(0).toArray(), []);
    });
    it('returns correct result', () => {
      arr.insert([0, 5, 5, 10]);
      assert.deepEqual(arr.lt(100).toArray(), [0, 5, 5, 10]);
      assert.deepEqual(arr.lt(10).toArray(), [0, 5, 5]);
      assert.deepEqual(arr.lt(5).toArray(), [0]);
    });
  });
  describe('lte', () => {
    it('returns empty array', () => {
      assert.deepEqual(arr.lte(0).toArray(), []);
    });
    it('returns correct result', () => {
      arr.insert([0, 5, 5, 10]);
      assert.deepEqual(arr.lte(100).toArray(), [0, 5, 5, 10]);
      assert.deepEqual(arr.lte(10).toArray(), [0, 5, 5, 10]);
      assert.deepEqual(arr.lte(5).toArray(), [0, 5, 5]);
      assert.deepEqual(arr.lte(0).toArray(), [0]);
    });
  });

});


describe('SortedArray with objects', () => {
  let arr: SortedArray<{ id: number, args: number }>;
  let sorted: Array<{ id: number, args: number }>;
  const obj: Array<{ id: number, args: number }> = [
    { id: 5, args: 0 },
    { id: 10, args: 1 },
    { id: 0, args: 2 },
    { id: 5, args: 3 }
  ];

  beforeEach(() => {
    arr = new SortedArray<{ id: number, args: number }>('id');
    sorted = [
      { id: 0, args: 2 },
      { id: 5, args: 0 },
      { id: 5, args: 3 },
      { id: 10, args: 1 }
    ];
  });

  describe('toArray', () => {
    it('converts to an array', () => {
      const result = arr.toArray();
      assert.equal(Array.isArray(result), true);
      assert.deepEqual(result, []);
    });
  });

  describe('insert', () => {
    it('adds elements', () => {
      assert.equal(arr.length, 0);
      arr.insert(obj);
      assert.equal(arr.length, 4);
    });

    it('sorts objects correctly', () => {
      arr.insert(obj);
      assert.deepEqual(arr.toArray(), sorted);
    });
  });

  describe('get', () => {
    it('returns correct indexes', () => {
      arr.insert(obj);

      assert.deepEqual(arr.get(0), sorted[0]);
      assert.deepEqual(arr.get(1), sorted[1]);
      assert.deepEqual(arr.get(2), sorted[2]);
      assert.deepEqual(arr.get(3), sorted[3]);
      assert.equal(arr.get(4), undefined);
    });
  });

  describe('search', () => {
    it('returns -1 when element not found', () => {
      arr.insert(obj);
      assert.equal(arr.search(2), -1);
    });

    it('returns correct index', () => {
      arr.insert(obj);
      assert.equal(arr.search(0), 0);
      assert.equal(arr.search(5), 1);
      assert.equal(arr.search(10), 3);
    });
  });

  describe('remove', () => {
    it('removes an element', () => {
      arr.insert(obj);
      arr.remove(0);
      sorted.splice(0, 1);
      assert.deepEqual(arr.toArray(), sorted);

      arr.remove(arr.length - 1);
      sorted.splice(sorted.length - 1, 1);
      assert.deepEqual(arr.toArray(), sorted);

      arr.remove(1);
      sorted.splice(1, 1);
      arr.remove(0);
      sorted.splice(0, 1);
      assert.equal(arr.length, sorted.length);
      assert.deepEqual(arr.toArray(), sorted);
    });

    it('removes multiple elements', () => {
      arr.insert(obj);
      arr.remove(0, 3);
      sorted.splice(0, 3);
      assert.deepEqual(arr.toArray(), sorted);
    });
  });

  describe('removeByValue', () => {
    it('removes multiple elements', () => {
      arr.insert(obj);
      assert.deepEqual(arr.removeByValue(5).toArray(), [
        { id: 0, args: 2 },
        { id: 10, args: 1 }
      ]);
    });
  });

  describe('gt', () => {
    it('returns empty array', () => {
      assert.deepEqual(arr.gt(0).toArray(), []);
    });
    it('returns correct result', () => {
      arr.insert(obj);
      assert.deepEqual(arr.gt(4).toArray(), [
        { id: 5, args: 0 },
        { id: 5, args: 3 },
        { id: 10, args: 1 }
      ]);
      assert.deepEqual(arr.gt(0).toArray(), [
        { id: 5, args: 0 },
        { id: 5, args: 3 },
        { id: 10, args: 1 }
      ]);
    });
  });

  describe('gte', () => {
    it('returns empty array', () => {
      assert.deepEqual(arr.gt(0).toArray(), []);
    });
    it('returns correct result', () => {
      arr.insert(obj);
      assert.deepEqual(arr.gte(10).toArray(), [{ id: 10, args: 1 }]);
      assert.deepEqual(arr.gte(5).toArray(), [
        { id: 5, args: 0 },
        { id: 5, args: 3 },
        { id: 10, args: 1 }
      ]);
      assert.deepEqual(arr.gte(0).toArray(), sorted);
    });
  });

  describe('lt', () => {
    it('returns empty array', () => {
      assert.deepEqual(arr.lt(0).toArray(), []);
    });
    it('returns correct result', () => {
      arr.insert(obj);
      assert.deepEqual(arr.lt(100).toArray(), sorted);
      assert.deepEqual(arr.lt(10).toArray(), [
        { id: 0, args: 2 },
        { id: 5, args: 0 },
        { id: 5, args: 3 }
      ]);
      assert.deepEqual(arr.lt(5).toArray(), [{ id: 0, args: 2 }]);
    });
  });

  describe('lte', () => {
    it('returns empty array', () => {
      assert.deepEqual(arr.lte(0).toArray(), []);
    });
    it('returns correct result', () => {
      arr.insert(obj);
      assert.deepEqual(arr.lte(100).toArray(), sorted);
      assert.deepEqual(arr.lte(10).toArray(), sorted);
      assert.deepEqual(arr.lte(5).toArray(), [
        { id: 0, args: 2 },
        { id: 5, args: 0 },
        { id: 5, args: 3 }
      ]);
      assert.deepEqual(arr.lte(0).toArray(), [{ id: 0, args: 2 }]);
    });
  });

});
