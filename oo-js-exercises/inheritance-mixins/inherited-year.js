class Vehicle {
  constructor(year) {
    this.year = year;
  }
  startEngine() {
    return "Ready to go!";
  }
}

class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year);
    this.bedType = bedType;
    this.startEngine();
  }
  startEngine(speed) {
    return `${super.startEngine()} Drive ${speed}, please!`;
  }
}

class Car extends Vehicle {
  constructor(year) {
    super(year);
  }
}

let truck1 = new Truck();
console.log(truck1.startEngine('fast'));

let truck2 = new Truck();
console.log(truck2.startEngine('slow'));

let car = new Car(2015);
console.log(car.year); // 2015