let cessna152 = {
  fuelCapacity: 24.5,
  cruisingSpeed: 111,
  takeOff() {
    console.log("Taking off!");
  },
  land() {
    console.log("Landing!");
  }
};
/*
State
  fuelCapacity = 24.5
  cruisingSpeed = 111
Behavior
  takeOff, land
*/

function Book(title, author, yearPublished) {
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;
}

let book1 = new Book("Neuromancer", "Wiiliam Gibson", 1984);
let book2 = new Book("Doomsday Book", "Connie Willis", 1992);

function Album(title, artist, yearReleased) {
  this.title = title;
  this.artist = artist;
  this.yearReleased = yearReleased;
}

let thriller = new Album("Thriller", "Michael Jackson", 1982);
let dsm = new Album("The Dark Side of the Moon", "Pink Floyd", 1973);

function Smartphone(brand, model, yearReleased) {
  this.brand = brand;
  this.model = model;
  this.yearReleased = yearReleased;
  this.batteryLevel = 50;
  this.battery = function() {
    console.log(`Battery level: ${this.batteryLevel}%`);
  };
  this.displayInfo = function() {
    console.log(`Brand: ${this.brand}\nModel: ${this.model}\nYear Released: ${this.yearReleased}`);
  };
}

let iphone12 = new Smartphone("Apple", "iPhone 12", 2020);
let galaxyS21 = new Smartphone("Samsung", "Galaxy S21", 2021);