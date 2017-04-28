/**
 * @file Sorted array abstract data type.
 * @copyright © 2017 Matus Gura
 */

export class SortedArray<T> {
  protected items: T[];
  protected key: string;
  protected cmp: (left: T, right: T) => number;

  constructor(key: string = null, cmp?: (left: T, right: T) => number) {
    this.items = [];
    this.key = key;
    this.cmp = cmp || (this.key ? this.objectComparison : this.defaultComparison);
  }

  get length(): number {
    return this.items.length;
  }

  public get(index: number): T {
    return this.items[index];
  }

  public insert(elements: T | T[], ...args: T[]): SortedArray<T> {
    const toInsert: T[] = (arguments.length === 1 && Array.isArray(elements))
                            ? elements.slice()
                            : Array.prototype.slice.call(arguments);

    if (this.items.length === 0) {
      this.items = toInsert.sort(this.cmp.bind(this));
      return;
    }

    toInsert.forEach((element) => {
      this.insertOne(element);
    });
    return this;
  }

  public remove(index: number, deleteCount: number = 1): SortedArray<T> {
    this.items.splice(index, deleteCount);
    return this;
  }

  public removeByValue(value: string | number | boolean | T): SortedArray<T> {
    const element = this.prepareComparableValue(value);

    let firstOccurrence: number = null;
    let numberOfEqualValues = 0;
    let index = this.greaterThan(element, true);

    if (index === -1) {
      return this;
    }

    while (index < this.items.length) {
      if (this.cmp(this.get(index), element) === 0) {
        if (firstOccurrence === null) {
          firstOccurrence = index;
        }
        numberOfEqualValues += 1;
      } else {
        break;
      }
      index += 1;
    }
    this.items.splice(firstOccurrence, numberOfEqualValues);
    return this;
  }

  public search(value: any): number {
    const element = this.prepareComparableValue(value);

    let middle: number;
    let min = 0;
    let max = this.items.length - 1;

    while (min <= max) {
      middle = (min + max) >> 1;

      const cmp = this.cmp(this.get(middle), element);
      if (cmp < 0) {
        min = middle + 1;
      } else if (cmp > 0) {
        max = middle - 1;
      } else if (min !== middle) {
        max = middle;
      } else {
        return middle;
      }
    }

    return -1;
  }

  public gt(value: any): SortedArray<T> {
    const index = this.greaterThan(value);
    const result = new SortedArray(this.key, this.cmp);
    result.insert((index < 0) ? [] : this.items.slice(index));
    return result;
  }

  public lt(value: any): SortedArray<T> {
    const index = this.lessThan(value);
    const result = new SortedArray(this.key, this.cmp);
    result.insert((index < 0) ? [] : this.items.slice(0, index + 1));
    return result;
  }

  public gte(value: any): SortedArray<T> {
    const index = this.greaterThan(value, true);
    const result = new SortedArray(this.key, this.cmp);
    result.insert((index < 0) ? [] : this.items.slice(index));
    return result;
  }

  public lte(value: any): SortedArray<T> {
    const index = this.lessThan(value, true);
    const result = new SortedArray(this.key, this.cmp);
    result.insert((index < 0) ? [] : this.items.slice(0, index + 1));
    return result;
  }

  public clear(): SortedArray<T> {
    this.items = [];
    return this;
  }

  public toArray(): T[] {
    return this.items;
  }

  public toString(): string {
    return this.items.toString();
  }

  protected greaterThan(value: any, orEqual: boolean = false): number {
    const element = this.prepareComparableValue(value);

    let middle: number;
    let min = 0;
    let max = this.items.length - 1;

    while (min <= max) {
      middle = (min + max) >> 1;

      const cmp = this.cmp(this.get(middle), element);
      if (cmp > 0 || (orEqual && cmp === 0)) {
        max = middle - 1;
      } else {
        min = middle + 1;
      }
    }

    return (max + 1 === this.items.length) ? -1 : max + 1;
  }

  protected lessThan(value: any, orEqual: boolean = false): number {
    const element = this.prepareComparableValue(value);

    let middle: number;
    let min = 0;
    let max = this.items.length - 1;

    while (min <= max) {
      middle = (min + max) >> 1;

      const cmp = this.cmp(this.get(middle), element);
      if ((!orEqual && cmp >= 0) || (orEqual && cmp > 0)) {
        max = middle - 1;
      } else {
        min = middle + 1;
      }
    }
    return (min - 1 < 0) ? -1 : min - 1;
  }

  private prepareComparableValue(value: any): T {
    let element: any;
    if (this.key && typeof value !== 'object') {
      element = {};
      element[this.key] = value;
    } else {
      element = value;
    }
    return element;
  }

  private defaultComparison(left: T, right: T): number {
    if (left < right) {
      return -1;
    } else if (left > right) {
      return 1;
    } else if (left === right) {
      return 0;
    }
  }

  private objectComparison(left: any, right: any): number {
    const leftValue: any = left[this.key];
    const rightValue: any = right[this.key];

    if (leftValue < rightValue) {
      return -1;
    } else if (leftValue > rightValue) {
      return 1;
    } else if (leftValue === rightValue) {
      return 0;
    }
  }

  private insertOne(element: T): SortedArray<T> {
    let index = this.greaterThan(element);
    if (index < 0) {
      index = this.items.length;
    }
    this.items.splice(index, 0, element);
    return this;
  }
}
