function Vehicle(license) {
  this.license = license;
}
Vehicle.prototype.register = function() {
  console.log("registered");
};


function Car(license) {
  this.license = license;
}
// Car.prototype = Object.assign({}, Vehicle.prototype);
Car.prototype = Object.create(Vehicle.prototype);
// Car.prototype = new Vehicle();
Car.prototype.constructor = Car;
Car.prototype.drive = function() {
  console.log("driving");
};

function Toyota(license) {
  this.license = license;
}
// Toyota.prototype = Object.assign({}, Car.prototype);
Toyota.prototype = Object.create(Car.prototype);
// Toyota.prototype = new Car();
Toyota.prototype.constructor = Toyota;
Toyota.prototype.brake = function() {
  console.log("regenerative braking!");
};

let prius = new Toyota("123");

console.log((prius instanceof Vehicle));
console.log(prius.__proto__);
console.log(prius.__proto__.__proto__);
console.log(prius.__proto__.__proto__.__proto__);
console.log(prius.__proto__.__proto__.__proto__.__proto__);
console.log(prius.__proto__.__proto__.__proto__.__proto__.__proto__);