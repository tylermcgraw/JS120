class Cat {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.func = () => console.log("func!");
  }

  whoAmI() {
    console.log(`My name is ${this.name}.`, `\nI am a ${this.color} cat.`);
  }
}

// Cat.prototype.test = function test() {
//   console.log("test");
// };

let cheddar = new Cat('Cheddar', 'ginger');
let cheddarProto = Object.getPrototypeOf(cheddar);

console.log(Object.getOwnPropertyNames(cheddarProto));
// ['constructor', 'whoAmI'];

cheddar.whoAmI();  // My name is Cheddar.
//                    I am a ginger cat.

let cheddarProto2 = Object.getPrototypeOf(cheddarProto);

console.log(cheddarProto2);
console.log(Object.getOwnPropertyNames(cheddarProto2));