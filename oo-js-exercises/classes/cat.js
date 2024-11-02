class Cat {
  constructor(name) {
    this.name = name;
  }
  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
  rename(name) {
    this.name = name;
  }
}

Cat.genericGreeting();
