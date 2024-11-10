function createCat(name, breed) {
  return {
    name,
    breed
  };
}

let aria = new createCat("Aria", "Domestic Shorthair");
console.log(aria instanceof createCat);
console.log(typeof aria);