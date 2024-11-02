class BufferObj {
  constructor(obj) {
    this.obj = obj;
    this.age = 0;
  }
  getValue() {
    return this.obj;
  }
  getAge() {
    return this.age;
  }
  incrementAge() {
    this.age += 1;
  }
}

class CircularBuffer {
  constructor(size) {
    this.buffer = new Array(size);
  }
  isEmpty() {
    return this.buffer.every(obj => obj === undefined);
  }
  isFull() {
    return this.indexOfEmpty() === -1;
  }
  put(element) {
    let obj = new BufferObj(element);
    if (this.isFull()) this.get();
    this.incrementAges();
    this.buffer[this.indexOfEmpty()] = obj;
  }
  indexOfEmpty() {
    return this.buffer.findIndex(obj => obj === undefined);
  }
  indexOfOldest() {
    let oldest = 0;
    for (let idx = 1; idx < this.buffer.length; idx += 1) {
      if (this.buffer[oldest] === undefined
        || (this.buffer[idx] !== undefined
        && this.buffer[idx].getAge() > this.buffer[oldest].getAge())) {
        oldest = idx;
      }
    }
    return oldest;
  }
  get() {
    let oldest = null;
    if (!this.isEmpty()) {
      oldest = this.buffer[this.indexOfOldest()].getValue();
      this.buffer[this.indexOfOldest()] = undefined;
    }
    return oldest;
  }
  incrementAges() {
    this.buffer.forEach(obj => {
      if (obj !== undefined) obj.incrementAge();
    });
  }
}

let buffer = new CircularBuffer(3);
console.log(buffer.get() === null);

buffer.put(1);
buffer.put(2);
console.log(buffer.get() === 1);

buffer.put(3);
buffer.put(4);
console.log(buffer.get() === 2);

buffer.put(5);
buffer.put(6);
buffer.put(7);
console.log(buffer.get() === 5);
console.log(buffer.get() === 6);
console.log(buffer.get() === 7);
console.log(buffer.get() === null);

let anotherbuffer = new CircularBuffer(4);
console.log(anotherbuffer.get() === null);

anotherbuffer.put(1);
anotherbuffer.put(2);
console.log(anotherbuffer.get() === 1);

anotherbuffer.put(3);
anotherbuffer.put(4);
console.log(anotherbuffer.get() === 2);

anotherbuffer.put(5);
anotherbuffer.put(6);
anotherbuffer.put(7);
console.log(anotherbuffer.get() === 4);
console.log(anotherbuffer.get() === 5);
console.log(anotherbuffer.get() === 6);
console.log(anotherbuffer.get() === 7);
console.log(anotherbuffer.get() === null);