class Rectangle {
  constructor(width, length) {
    this.length = length;
    this.width = width;
  }
  getWidth() {
    return this.width;
  }
  getLength() {
    return this.length;
  }
  getArea() {
    return this.width * this.length;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25