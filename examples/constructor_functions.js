function Cat(name, breed) {
  this.name = name;
  this.breed = breed;
}

const meowMixin = {
  meow() {
    console.log("meow");
  }
};

Object.assign(Cat.prototype, meowMixin);

let aria = new Cat("Aria", "Domestic Shorthair");
console.log(aria instanceof Cat);
console.log(typeof aria);
console.log(typeof Cat);
console.log(Object.getPrototypeOf(aria) === Cat.prototype);
console.log(aria.__proto__);
console.log(Object.getOwnPropertyNames(Cat.prototype));
console.log(Cat.prototype.constructor);